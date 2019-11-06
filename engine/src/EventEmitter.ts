export class EventEmitter {
  private handlers: {[eventName: string]: (() => void)[] } = {};

  on(eventName: string, callback: () => void) {
    this.handlers[eventName] = this.handlers[eventName] || [];
    this.handlers[eventName].push(callback);
  }

  emit(eventName: string) {
    (this.handlers[eventName] || []).forEach(c => c());
  }
}
