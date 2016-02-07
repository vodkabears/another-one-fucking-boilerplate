import Dispatcher from 'lib/dispatcher';

export default class ComponentModel {
  /**
   * @param {React.Component} view View part of the component
   */
  constructor(view) {
    /**
     * @protected
     * @type {React.Component}
     */
    this._view = view;

    /**
     * @protected
     * @type {Map} Function bindings
     */
    this._bindings = new Map();

    /**
     * @protected
     * @type {Map} Event listeners
     */
    this._listeners = new Map();
  }

  /**
   * @returns {Object}
   */
  get props() {
    return this._view.props;
  }

  /**
   * @returns {Object}
   */
  get state() {
    return this._view.state;
  }

  /**
   * Sets a new state of the component
   * @param {Object} state
   */
  setState(state) {
    this._view.setState(state);
  }

  /**
   * Returns a function binding to the model context
   * @param {Function} fn
   * @returns {Function}
   */
  bindToThis(fn) {
    let bindings = this._bindings;
    let binding = bindings.get(fn);

    if (!binding) {
      binding = fn.bind(this);
      bindings.set(fn, binding);
    }

    return binding;
  }

  /**
   * Triggers an event
   * @param {String} event
   * @param {Object} data
   * @returns {ComponentModel}
   */
  emit(event, data) {
    Dispatcher.emit(event, data);

    return this;
  }

  /**
   * Adds a binded listener for the event
   * @param {String} event
   * @param {Function} listener
   * @returns {ComponentModel}
   */
  on(event, listener) {
    let listenerBinding = this.bindToThis(listener);

    this._listeners.set(event, listenerBinding);
    Dispatcher
      .off(event, listenerBinding)
      .on(event, listenerBinding);

    return this;
  }

  /**
   * Adds a one time binded listener for the event
   * @param {String} event
   * @param {Function} listener
   * @returns {ComponentModel}
   */
  once(event, listener) {
    let listenerBinding = this.bindToThis(listener);

    this._listeners.set(event, listenerBinding);
    Dispatcher
      .off(event, listenerBinding)
      .once(event, listenerBinding);

    return this;
  }

  /**
   * Removes a binded listener of the event
   * @param {String} event
   * @param {Function} listener
   * @returns {ComponentModel}
   */
  off(event, listener) {
    this._listeners.delete(event);
    Dispatcher.off(event, this.bindToThis(listener));

    return this;
  }

  /**
   * Makes actions before the component is destroyed
   */
  destroy() {
    let listeners = this._listeners;

    listeners.forEach((listenerBinding, event) => {
      Dispatcher.off(event, listenerBinding);
    });

    listeners.clear();
    this._bindings.clear();
  }
}
