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
     * @type {Number}
     */
    this._lastID = 0;

    /**
     * @protected
     * @type {Number}
     */
    this._completedNumber = 0;

    this
      .on(EVENTS.TodoCreateItem, this._handleTodoCreateItem)
      .on(EVENTS.TodoDeleteItem, this._handleTodoDeleteItem)
      .on(EVENTS.TodoUpdateItem, this._handleTodoUpdateItem)
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
   * Handles 'TodoDeleteItem' event
   * @protected
   * @param {Object} data
   *  @param {Number} data.id
   */
  _handleTodoDeleteItem(data) {
    this.deleteTodo(data.id);
  }

  /**
   * Handles 'TodoUpdateItem' event
   * @protected
   * @param {Object} data
   *  @param {Number} data.id
   *  @param {String} data.text
   */
  _handleTodoUpdateItem(data) {
    this.updateTodo(data.id, data.text);
  }

  /**
   * Handles 'TodoToggleItem' event
   * @protected
   * @param {Object} data
   *  @param {Number} id
   *  @param {Boolean} makeCompleted
   */
  _handleTodoToggleItem(data) {
    let isCompleted = data.makeCompleted;
    let todoItems = this.state.todoItems;
    let size = Object.keys(todoItems).length;
    let id = data.id;

    todoItems[id].isCompleted = isCompleted;

    if (
      isCompleted && ++this._completedNumber === size ||
      !isCompleted && this._completedNumber-- === size
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
    let todoItems = this.state.todoItems;
    let isCompleted = data.makeCompleted;

    this._completedNumber = isCompleted ? Object.keys(todoItems).length : 0;
    Object.keys(todoItems).forEach(id => todoItems[id].isCompleted = isCompleted);
    this.setState({ todoItems });
  }

  /**
   * Adds a new todo
   * @param {String} text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    let lastID = this._lastID++;
    let todoItems = this.state.todoItems;

    todoItems[lastID] = {
      id: lastID,
      isCompleted: false,
      text: text.trim()
    };

    this.setState({ todoItems });
  }

  /**
   * Updates a todo
   * @param {Number} id
   * @param {String} text
   */
  updateTodo(id, text) {
    let todoItems = this.state.todoItems;

    todoItems[id].text = text.trim();
    this.setState({ todoItems });
  }

  /**
   * Deletes a todo
   * @param {Number} id
   */
  deleteTodo(id) {
    let todoItems = this.state.todoItems;

    delete todoItems[id];
    this.setState({ todoItems });
  }
}
