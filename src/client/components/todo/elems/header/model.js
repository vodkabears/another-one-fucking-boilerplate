import Model from 'lib/component-model';
import Dispatcher, { EVENTS } from 'lib/dispatcher';

export default class TodoHeaderModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    Dispatcher.on(EVENTS.TodoToggleLast, this.bindToThis(this._handleTodoToggleLast));
  }

  /**
   * Handles 'TodoToggleLast' event
   * @protected
   * @param {Object} data
   *  @param {Boolean} isCompleted
   */
  _handleTodoToggleLast(data) {
    this.setState({ isCheckboxChecked: data.isCompleted });
  }

  /**
   * Orders to create a new todo
   * @param {String} text
   */
  createTodo(text) {
    Dispatcher.emit(EVENTS.TodoCreateItem, { text });
    this.setState({
      input: '',
      isCheckboxChecked: false
    });
  }
  /**
   * Sync changes in the input
   * @param {String} text
   */
  syncInputText(text) {
    this.setState({ input: text });
  }

  /**
   * Orders to toggle all todos
   * @param {Boolean} makeCompleted
   */
  toggleAll(makeCompleted) {
    Dispatcher.emit(EVENTS.TodoToggleAll, { makeCompleted });
    this.setState({ isCheckboxChecked: makeCompleted });
  }

  /**
   * @override
   */
  destroy() {
    super.destroy();

    Dispatcher.off(EVENTS.TodoToggleLast, this.bindToThis(this._handleTodoToggleLast));
  }
}
