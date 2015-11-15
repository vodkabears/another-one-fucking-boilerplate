import Model from 'lib/component-model';
import Dispatcher, { EVENTS } from 'lib/dispatcher';

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

    Dispatcher
      .on(EVENTS.TodoCreateItem, this.bindToThis(this._handleTodoCreateItem))
      .on(EVENTS.TodoToggleItem, this.bindToThis(this._handleTodoToggleItem))
      .on(EVENTS.TodoToggleAll, this.bindToThis(this._handleTodoToggleAll));
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
      Dispatcher.emit(EVENTS.TodoToggleLast, { isCompleted });
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
    this._todoItems.push({
      id: this._todoItems.length,
      isCompleted: false,
      text
    });

    this.setState({ todoItems: this._todoItems });
  }

  /**
   * @override
   */
  destroy() {
    super.destroy();

    Dispatcher
      .off(EVENTS.TodoCreateItem, this.bindToThis(this._handleTodoCreateItem))
      .off(EVENTS.TodoToggleItem, this.bindToThis(this._handleTodoToggleItem))
      .off(EVENTS.TodoToggleAll, this.bindToThis(this._handleTodoToggleAll));
  }
}
