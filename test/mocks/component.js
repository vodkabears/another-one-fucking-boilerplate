export default class ComponentMock {
  constructor(props, state) {
    this.props = props || {};
    this.state = state || {};
  }

  /**
   * @param {Object} nextState
   */
  setState(nextState) {
    this.state = Object.assign({}, this.state, nextState);
  }
}
