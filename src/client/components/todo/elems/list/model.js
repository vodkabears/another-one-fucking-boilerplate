import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodoListModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    /**
     * @protected
     * @type {Array}
     */
    this._todoItems = [];

    /**
     * @protected
     * @type {Number}
     */
    this._completedNumber = 0;

    this
      .on(EVENTS.TodoCreateItem, this._handleTodoCreateItem)
      .on(EVENTS.TodoToggleItem, this._handleTodoToggleItem)
      .on(EVENTS.TodoToggleAll, this._handleTodoToggleAll);
  }

  /**
   * Handles 'TodoCreateItem' event
   * @protected
   * @param {Object} data
   *  @param {String} data.text
   */
  _handleTodoCreateItem(data) {
    this.addTodo(data.text);
  }

  /**
   * Handles 'TodoToggleItem' event
   * @protected
   * @param {Object} data
   *  @param {Number} id
   *  @param {Boolean} makeCompleted
   */
  _handleTodoToggleItem(data) {
    let todoItems = this._todoItems;
    let id = data.id;
    let isCompleted = data.makeCompleted;

    todoItems[id].isCompleted = isCompleted;

    if (
      isCompleted && ++this._completedNumber === todoItems.length ||
      !isCompleted && this._completedNumber-- === todoItems.length
    ) {
      this.emit(EVENTS.TodoToggleLast, { isCompleted });
    }

    this.setState({ todoItems });
  }

  /**
   * Handles 'TodoToggleAll' event
   * @protected
   * @param {Object} data
   *  @param {Boolean} makeCompleted
   */
  _handleTodoToggleAll(data) {
    let todoItems = this._todoItems;
    let isCompleted = data.makeCompleted;

    this._completedNumber = isCompleted ? todoItems.length : 0;
    todoItems.forEach(item => item.isCompleted = isCompleted);
    this.setState({ todoItems });
  }

  /**
   * Adds a new todo
   * @param {String} text
   */
  addTodo(text) {
    let todoItems = this._todoItems;

    todoItems.push({
      id: this._todoItems.length,
      isCompleted: false,
      text
    });

    this.setState({ todoItems });
  }
}
