import Model from 'lib/component-model';
import EVENTS from 'lib/events';
import BrowserStorage from 'lib/storage/browser-storage';

export default class TodoListModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    /**
     * @protected
     * @type {BrowserStorage}
     */
    this._todosStorage = new BrowserStorage('todos');

    this
      .on(EVENTS.TodoCreateItem, this._handleTodoCreateItem)
      .on(EVENTS.TodoDeleteItem, this._handleTodoDeleteItem)
      .on(EVENTS.TodoUpdateItem, this._handleTodoUpdateItem)
      .on(EVENTS.TodoToggleItem, this._handleTodoToggleItem)
      .on(EVENTS.TodoToggleAll, this._handleTodoToggleAll)
      .on(EVENTS.TodoClearCompleted, this._handleTodoClearCompleted);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {String} data.text
   */
  _handleTodoCreateItem(data) {
    this.addTodo(data.text);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} data.id
   */
  _handleTodoDeleteItem(data) {
    this.deleteTodo(data.id);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} data.id
   *  @param {String} data.text
   */
  _handleTodoUpdateItem(data) {
    this.updateTodo(data.id, data.text);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} id
   *  @param {Boolean} makeCompleted
   */
  _handleTodoToggleItem(data) {
    this.toggleItem(data.id, data.makeCompleted);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Boolean} makeCompleted
   */
  _handleTodoToggleAll(data) {
    this.toggleAll(data.makeCompleted);
  }

  /**
   * @protected
   */
  _handleTodoClearCompleted() {
    this.deleteCompleted();
  }

  /**
   * Informs about an update
   * @protected
   */
  inform() {
    let todoItems = this.state.todoItems;

    this.emit(EVENTS.TodoUpdatedList, {
      completed: todoItems.filter(item => item.isCompleted).length,
      state: this.props.query.state,
      size: todoItems.length
    });
  }

  /**
   * Loades data from the store
   */
  load() {
    this._todosStorage.sync().then(data => {
      this.setState({ todoItems: data.items });
      this.inform();
    });
  }

  /**
   * Adds a new todo
   * @param {String} text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    this._todosStorage.add({
      isCompleted: false,
      text: text.trim()
    }).then(data => {
      this.setState({ todoItems: data.items });
    });
  }

  /**
   * Updates a todo
   * @param {Number} id
   * @param {String} text
   */
  updateTodo(id, text) {
    this._todosStorage.update({ text: text.trim() }, { id }).then(data => {
      this.setState({ todoItems: data.items });
    });
  }

  /**
   * Deletes a todo
   * @param {Number} id
   */
  deleteTodo(id) {
    this._todosStorage.remove({ id }).then(data => {
      this.setState({ todoItems: data.items });
    });
  }

  /**
   * Deletes completed todos
   */
  deleteCompleted() {
    this._todosStorage.remove({ isCompleted: true }).then(data => {
      this.setState({ todoItems: data.items });
    });
  }

  /**
   * Toggles a todo
   * @param {Number} id
   * @param {Boolean} isCompleted
   */
  toggleItem(id, isCompleted) {
    this._todosStorage.update({ isCompleted }, { id }).then(data => {
      this.setState({ todoItems: data.items });
    });
  }

  /**
   * Toggles all todos
   * @param {Boolean} isCompleted
   */
  toggleAll(isCompleted) {
    this._todosStorage.update({ isCompleted }).then(data => {
      this.setState({ todoItems: data.items });
    });
  }
}
