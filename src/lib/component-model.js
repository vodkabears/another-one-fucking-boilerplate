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
     * @type {Object}
     */
    this.props = this._view.props;

    /**
     * @type {Object}
     */
    this.state = this._view.state;

    /**
     * @protected
     * @type {Map} Function bindings
     */
    this._bindings = new Map();
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
   * @param {Function} func
   * @returns {Function}
   */
  bindToThis(func) {
    let bindings = this._bindings;
    let binding = bindings.get(func);

    if (!binding) {
      binding = func.bind(this);
      bindings.set(func, binding);
    }

    return binding;
  }

  /**
   * Makes actions before the component is destroyed
   */
  destroy() {
    this._bindings.clear();
  }
}
