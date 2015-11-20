import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodoHeaderModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    this.on(EVENTS.TodoToggleLast, this._handleTodoToggleLast);
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
    this.emit(EVENTS.TodoCreateItem, { text });
    this.setState({
      input: '',
      isCheckboxChecked: false
    });
  }

  /**
   * Syncs changes in the input
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
    this.emit(EVENTS.TodoToggleAll, { makeCompleted });
    this.setState({ isCheckboxChecked: makeCompleted });
  }
}
