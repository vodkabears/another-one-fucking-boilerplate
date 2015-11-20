import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodoHeaderModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    this.on(EVENTS.TodoUpdatedList, this._handleTodoUpdatedList);
  }

  /**
   * Handles 'TodoUpdatedList' event
   * @protected
   * @param {Object} data
   *  @param {Number} data.completed
   *  @param {Number} data.size
   */
  _handleTodoUpdatedList(data) {
    let size = data.size;

    this.setState({
      isCheckboxChecked: size > 0 && data.completed === size
    });
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
