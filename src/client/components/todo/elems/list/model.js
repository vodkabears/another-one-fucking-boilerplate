import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Todo';

export default class TodoListModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

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

    if (!todoItems) {
      return;
    }

    this.emit(EVENTS.TodoUpdatedList, {
      completed: todoItems.filter(item => item.isCompleted).length,
      size: todoItems.length
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

    API.add(GATE, {
      text,
      isCompleted: false
    }).then(data => this.setState({ todoItems: data.items }));
  }

  /**
   * Updates a todo
   * @param {Number} id
   * @param {String} text
   */
  updateTodo(id, text) {
    if (!text) {
      return;
    }

    API.update(GATE, { text }, { id })
      .then(data => this.setState({ todoItems: data.items }));
  }

  /**
   * Deletes a todo
   * @param {Number} id
   */
  deleteTodo(id) {
    API.remove(GATE, { id })
      .then(data => this.setState({ todoItems: data.items }));
  }

  /**
   * Deletes completed todos
   */
  deleteCompleted() {
    let todoItems = this.state.todoItems;

    if (!todoItems) {
      return;
    }

    API.remove(GATE, {
      id: todoItems.filter(item => item.isCompleted).map(item => item.id)
    }).then(data => this.setState({ todoItems: data.items }));
  }

  /**
   * Toggles a todo
   * @param {Number} id
   * @param {Boolean} isCompleted
   */
  toggleItem(id, isCompleted) {
    API.update(GATE, { isCompleted }, { id })
      .then(data => this.setState({ todoItems: data.items }));
  }

  /**
   * Toggles all todos
   * @param {Boolean} isCompleted
   */
  toggleAll(isCompleted) {
    let todoItems = this.state.todoItems;

    if (!todoItems) {
      return;
    }

    API.update(GATE, { isCompleted }, {
      id: todoItems.map(item => item.id)
    }).then(data => this.setState({ todoItems: data.items }));
  }
}
