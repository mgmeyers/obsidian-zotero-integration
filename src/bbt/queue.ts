/**
 * Lighter version of
 * Heap.ts from https://github.com/ignlg/heap-js/blob/master/src/Heap.ts
 * heap-js by @ignlg
 */

export type Comparator<T> = (a: T, b: T) => number;
export type IsEqual<T> = (e: T, o: T) => boolean;

export const toInt = (n: number): number => ~~n;

/**
 * Heap
 * @type {Class}
 */
export class Heap<T> {
  heapArray: Array<T> = [];
  _limit = 0;

  /**
   * Heap instance constructor.
   * @param  {Function} compare Optional comparison function, defaults to Heap.minComparator<number>
   */
  constructor(public compare: Comparator<T>) {}

  /*
            Static methods
   */

  /**
   * Gets children indices for given index.
   * @param  {Number} idx     Parent index
   * @return {Array(Number)}  Array of children indices
   */
  static getChildrenIndexOf(idx: number): Array<number> {
    return [idx * 2 + 1, idx * 2 + 2];
  }

  /**
   * Gets parent index for given index.
   * @param  {Number} idx  Children index
   * @return {Number | undefined}      Parent index, -1 if idx is 0
   */
  static getParentIndexOf(idx: number): number {
    if (idx <= 0) {
      return -1;
    }
    const whichChildren = idx % 2 ? 1 : 2;
    return Math.floor((idx - whichChildren) / 2);
  }

  /*
            Instance methods
   */

  /**
   * Adds an element to the heap. Aliases: `offer`.
   * Same as: push(element)
   * @param {any} element Element to be added
   * @return {Boolean} true
   */
  push(element: T): boolean {
    this._sortNodeUp(this.heapArray.push(element) - 1);
    return true;
  }

  /**
   * Length of the heap.
   * @return {Number}
   */
  length(): number {
    return this.heapArray.length;
  }

  /**
   * Top node. Aliases: `element`.
   * Same as: `top(1)[0]`
   * @return {any} Top node
   */
  peek(): T | undefined {
    return this.heapArray[0];
  }

  /**
   * Extract the top node (root). Aliases: `poll`.
   * @return {any} Extracted top node, undefined if empty
   */
  pop(): T | undefined {
    const last = this.heapArray.pop();
    if (this.length() > 0 && last !== undefined) {
      return this.replace(last);
    }
    return last;
  }

  /**
   * Pop the current peek value, and add the new item.
   * @param  {any} element  Element to replace peek
   * @return {any}         Old peek
   */
  replace(element: T): T {
    const peek = this.heapArray[0];
    this.heapArray[0] = element;
    this._sortNodeDown(0);
    return peek;
  }

  /**
   * Size of the heap
   * @return {Number}
   */
  size(): number {
    return this.length();
  }

  /**
   * Move a node to a new index, switching places
   * @param  {Number} j First node index
   * @param  {Number} k Another node index
   */
  _moveNode(j: number, k: number): void {
    [this.heapArray[j], this.heapArray[k]] = [
      this.heapArray[k],
      this.heapArray[j],
    ];
  }

  /**
   * Move a node down the tree (to the leaves) to find a place where the heap is sorted.
   * @param  {Number} i Index of the node
   */
  _sortNodeDown(i: number): void {
    let moveIt = i < this.heapArray.length - 1;
    const self = this.heapArray[i];

    const getPotentialParent = (best: number, j: number) => {
      if (
        this.heapArray.length > j &&
        this.compare(this.heapArray[j], this.heapArray[best]) < 0
      ) {
        best = j;
      }
      return best;
    };

    while (moveIt) {
      const childrenIdx = Heap.getChildrenIndexOf(i);
      const bestChildIndex = childrenIdx.reduce(
        getPotentialParent,
        childrenIdx[0]
      );
      const bestChild = this.heapArray[bestChildIndex];
      if (
        typeof bestChild !== 'undefined' &&
        this.compare(self, bestChild) > 0
      ) {
        this._moveNode(i, bestChildIndex);
        i = bestChildIndex;
      } else {
        moveIt = false;
      }
    }
  }

  /**
   * Move a node up the tree (to the root) to find a place where the heap is sorted.
   * @param  {Number} i Index of the node
   */
  _sortNodeUp(i: number): void {
    let moveIt = i > 0;
    while (moveIt) {
      const pi = Heap.getParentIndexOf(i);
      if (pi >= 0 && this.compare(this.heapArray[pi], this.heapArray[i]) > 0) {
        this._moveNode(i, pi);
        i = pi;
      } else {
        moveIt = false;
      }
    }
  }
}

// This is the central part of the concept:
// using a Promise<void> as a semaphore
interface Semaphore {
  wait: Promise<void>;
  signal: () => void;
}

interface JobWaiting<T> {
  hash: T;
  prio: number;
  counter: number;
  start: Semaphore;
}

interface JobRunning<T> {
  hash: T;
  prio: number;
  finish: Semaphore;
}

/**
 * @type QueueStats {running: number, waiting: number, last: number}
 */
interface QueueStats {
  running: number;
  waiting: number;
  last: number;
}

function prioCompare<T>(a: JobWaiting<T>, b: JobWaiting<T>) {
  return a.prio - b.prio || a.counter - b.counter;
}

export class Queue<T = unknown> {
  maxConcurrent: number;
  minCycle: number;
  queueRunning: Map<T, JobRunning<T>>;
  queueWaiting: Heap<JobWaiting<T>>;
  lastRun: number;
  nextTimer: Promise<void> | null;
  counter: number;

  /**
   * @class Queue
   *
   * Priority queue with rate limiting<br>
   * See the medium article:<br>
   * https://mmomtchev.medium.com/parallelizing-download-loops-in-js-with-async-await-queue-670420880cd6
   * (the code has changed a lot since that article but the basic idea of using Promises as locks remains the same)
   *
   * @param {number} [maxConcurrent=1] Number of tasks allowed to run simultaneously
   * @param {number} [minCycle=0] Minimum number of milliseconds between two consecutive tasks
   */
  constructor(maxConcurrent?: number, minCycle?: number) {
    this.maxConcurrent = maxConcurrent || 1;
    this.minCycle = minCycle || 0;
    this.queueRunning = new Map<T, JobRunning<T>>();
    this.queueWaiting = new Heap<JobWaiting<T>>(prioCompare);
    this.lastRun = 0;
    this.nextTimer = null;
    this.counter = 0;
  }

  /**
   * @private
   */
  tryRun(): void {
    while (
      this.queueWaiting.size() > 0 &&
      this.queueRunning.size < this.maxConcurrent
    ) {
      /* Wait if it is too soon */
      if (Date.now() - this.lastRun < this.minCycle) {
        if (this.nextTimer === null) {
          this.nextTimer = new Promise((resolve) =>
            activeWindow.setTimeout(() => {
              this.nextTimer = null;
              this.tryRun();
              resolve();
            }, this.minCycle - Date.now() + this.lastRun)
          );
        }
        return;
      }

      /* Choose the next task to run and unblock its promise */
      const next = this.queueWaiting.pop();
      if (next !== undefined) {
        let finishSignal;
        const finishWait = new Promise<void>((resolve) => {
          finishSignal = resolve;
        });
        const finish = { wait: finishWait, signal: finishSignal } as Semaphore;
        const nextRunning = {
          hash: next.hash,
          prio: next.prio,
          finish,
        } as JobRunning<T>;
        if (this.queueRunning.has(next.hash)) {
          throw new Error('async-await-queue: duplicate hash ' + next.hash);
        }
        this.queueRunning.set(next.hash, nextRunning);
        this.lastRun = Date.now();

        next.start.signal();
      }
    }
  }

  /**
   * Signal that the task `hash` has finished.<br>
   * Frees its slot in the queue
   *
   * @method end
   * @param {any} hash Unique hash identifying the task, Symbol() works very well
   */
  end(hash: T): void {
    const me = this.queueRunning.get(hash);
    if (me === undefined)
      throw new Error('async-await-queue: queue desync for ' + hash);

    this.queueRunning.delete(hash);
    me.finish.signal();

    this.tryRun();
  }

  /**
   * Wait for a slot in the queue
   *
   * @method wait
   * @param {any} hash Unique hash identifying the task
   * @param {number} [priority=0] Optional priority, -1 is higher priority than 1
   * @return {Promise<void>} Resolved when the task is ready to run
   */
  async wait(hash: T, priority?: number): Promise<void> {
    const prio = priority ?? 0;

    /* Are we allowed to run? */
    /* This promise will be unlocked from the outside */
    /* and it cannot reject */
    let signal;
    const wait = new Promise<void>((resolve) => {
      signal = resolve;
    });
    /* Us on the queue */
    const meWaiting: JobWaiting<T> = {
      hash,
      prio,
      start: { signal, wait },
      counter: this.counter++,
    };

    /* Get in the line */
    this.queueWaiting.push(meWaiting);
    this.tryRun();
    await wait;

    this.lastRun = Date.now();
  }

  /**
   * Run a job (equivalent to calling Queue.wait(), fn() and then Queue.end())<br>
   * fn can be both synchronous or asynchronous function
   *
   * @method run
   * @param {Function} job The job
   * @param {number} [priority=0] Optional priority, -1 is higher priority than 1
   * @return {Promise<any>} Resolved when the task has finished with the return value of fn
   */
  run<U>(job: () => Promise<U>, priority?: number): Promise<U> {
    const prio = priority ?? 0;
    const id = Symbol();
    return this.wait(id as T, prio)
      .then(job)
      .finally(() => {
        this.end(id as T);
      });
  }

  /**
   * Return the number of running and waiting jobs
   *
   * @method stat
   * @return {QueueStats} running, waiting, last
   */
  stat(): QueueStats {
    return {
      running: this.queueRunning.size,
      waiting: this.queueWaiting.size(),
      last: this.lastRun,
    };
  }

  /**
   * Returns a promise that resolves when the queue is empty
   * (or there are no more than <maxWaiting> waiting tasks
   * if the argument is provided)
   *
   * @method flush
   * @return {Promise<void>}
   */
  async flush(maxWaiting?: number): Promise<void> {
    while (this.queueRunning.size > 0 || this.queueWaiting.size() > 0) {
      const waiting = this.queueWaiting.peek();
      if (waiting) {
        await waiting.start.wait;
      }
      if (maxWaiting !== undefined && this.queueWaiting.size() < maxWaiting)
        return;
      if (this.queueRunning.size > 0) {
        const running = this.queueRunning.values().next()
          .value as JobRunning<T>;
        await running.finish.wait;
      }
    }
  }
}

export const ZQueue = new Queue(1);
