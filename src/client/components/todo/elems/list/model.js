import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const STORAGE_NAME = 'TodoList';

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
    this._size = 0;

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
   *  @param {Boolean} data.isCompleted
   */
  _handleTodoDeleteItem(data) {
    this.deleteTodo(data.id, data.isCompleted);
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
  _inform() {
    this.emit(EVENTS.TodoUpdatedList, {
      completed: this._completedNumber,
      state: this.props.query.state,
      size: this._size
    });
  }

  /**
   * Saves data to the store
   */
  save() {
    localStorage && localStorage.setItem(STORAGE_NAME, JSON.stringify(this.state.todoItems));
    this._inform();
  }

  /**
   * Loades data from the store
   */
  load() {
    if (!localStorage) {
      return;
    }

    let todoItems = JSON.parse(localStorage.getItem(STORAGE_NAME));

    if (todoItems) {
      let todoItemsKeys = Object.keys(todoItems);

      this._size = todoItemsKeys.length;
      this._completedNumber = todoItemsKeys.filter(key => {
        this._lastID = key + 1;

        return todoItems[key].isCompleted;
      }).length;

      this.setState({ todoItems });
    }

    this._inform();
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

    this._size++;
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
   * @param {Boolean} isCompleted
   */
  deleteTodo(id, isCompleted) {
    let todoItems = this.state.todoItems;

    delete todoItems[id];
    isCompleted && this._completedNumber--;
    this._size--;

    this.setState({ todoItems });
  }

  /**
   * Deletes completed todos
   */
  deleteCompleted() {
    let todoItems = this.state.todoItems;

    Object.keys(todoItems).forEach(id => {
      if (todoItems[id].isCompleted) {
        delete todoItems[id];
        this._size--;
        this._completedNumber--;
      }
    });

    this.setState({ todoItems });
  }

  /**
   * Toggles a todo
   * @param {Number} id
   * @param {Boolean} isCompleted
   */
  toggleItem(id, isCompleted) {
    let todoItems = this.state.todoItems;

    todoItems[id].isCompleted = isCompleted;
    isCompleted ? this._completedNumber++ : this._completedNumber--;

    this.setState({ todoItems });
  }

  /**
   * Toggles all todos
   * @param {Boolean} isCompleted
   */
  toggleAll(isCompleted) {
    let todoItems = this.state.todoItems;

    this._completedNumber = isCompleted ? this._size : 0;
    Object.keys(todoItems).forEach(id => todoItems[id].isCompleted = isCompleted);

    this.setState({ todoItems });
  }
}
