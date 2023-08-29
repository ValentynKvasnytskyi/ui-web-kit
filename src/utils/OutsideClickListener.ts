class OutsideClickListener {
  private static listeners: OutsideClickListener[] = [];
  private static globalListenerAdded = false;
  private element: HTMLElement;
  private callback: () => void;

  constructor(element: HTMLElement, callback: () => void) {
    this.element = element;
    this.callback = callback;

    OutsideClickListener.listeners.push(this);

    if (!OutsideClickListener.globalListenerAdded) {
      document.addEventListener("click", OutsideClickListener.handleGlobalClick);
      OutsideClickListener.globalListenerAdded = true;
    }
  }

  static handleGlobalClick(event: MouseEvent) {
    for (const listener of OutsideClickListener.listeners) {
      if (!listener.element.contains(event.target as HTMLElement)) {
        listener.callback();
      }
    }
  }

  destroy() {
    const index = OutsideClickListener.listeners.indexOf(this);
    if (index > -1) {
      OutsideClickListener.listeners.splice(index, 1);
    }

    if (OutsideClickListener.listeners.length === 0) {
      document.removeEventListener("click", OutsideClickListener.handleGlobalClick);
      OutsideClickListener.globalListenerAdded = false;
    }
  }
}

export default OutsideClickListener;
