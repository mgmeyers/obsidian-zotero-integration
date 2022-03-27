import { App, Modal } from "obsidian";

export class LoadingModal extends Modal {
	message: string;

	constructor(app: App, message: string) {
		super(app);
		this.message = message;
	}

	onOpen() {
		this.contentEl.createDiv({ text: this.message });
	}

	onClose() {
		this.contentEl.empty();
	}
}
