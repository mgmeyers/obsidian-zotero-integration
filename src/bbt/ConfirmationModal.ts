import { App, Modal } from 'obsidian';

export class ConfirmationModal extends Modal {
  private resolvePromise: (value: boolean) => void;
  private promise: Promise<boolean>;

  constructor(app: App, private title: string, private message: string) {
    super(app);
    this.promise = new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    // Create modal content
    const container = contentEl.createDiv('confirmation-modal');
    
    // Title
    const titleEl = container.createEl('h2', { text: this.title });
    titleEl.addClass('confirmation-modal-title');
    
    // Message
    const messageEl = container.createEl('p', { text: this.message });
    messageEl.addClass('confirmation-modal-message');
    
    // Buttons container
    const buttonContainer = container.createDiv('confirmation-modal-buttons');
    
    // Cancel button
    const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
    cancelButton.addClass('mod-warning');
    cancelButton.addEventListener('click', () => {
      this.resolvePromise(false);
      this.close();
    });
    
    // Confirm button
    const confirmButton = buttonContainer.createEl('button', { text: 'Overwrite' });
    confirmButton.addClass('mod-cta');
    confirmButton.addEventListener('click', () => {
      this.resolvePromise(true);
      this.close();
    });
    
    // Focus on cancel button by default
    cancelButton.focus();
  }

  onClose() {
    this.contentEl.empty();
  }

  async waitForResult(): Promise<boolean> {
    return this.promise;
  }
} 