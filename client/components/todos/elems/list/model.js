import API from 'lib/api';
import Model from 'lib/component-model';
import EVENTS from 'lib/events';

const GATE = '/api/components/Todos';

export default class TodosListModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    this
      .on(EVENTS.TodosCreateItem, this._handleTodosCreateItem)
      .on(EVENTS.TodosDeleteItem, this._handleTodosDeleteItem)
      .on(EVENTS.TodosUpdateItem, this._handleTodosUpdateItem)
      .on(EVENTS.TodosToggleItem, this._handleTodosToggleItem)
      .on(EVENTS.TodosToggleAll, this._handleTodosToggleAll)
      .on(EVENTS.TodosClearCompleted, this._handleTodosClearCompleted);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {String} data.text
   */
  _handleTodosCreateItem(data) {
    this.addTodo(data.text);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} data.id
   */
  _handleTodosDeleteItem(data) {
    this.deleteTodo(data.id);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} data.id
   *  @param {String} data.text
   */
  _handleTodosUpdateItem(data) {
    this.updateTodo(data.id, data.text);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} id
   *  @param {Boolean} makeCompleted
   */
  _handleTodosToggleItem(data) {
    this.toggleTodo(data.id, data.makeCompleted);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Boolean} makeCompleted
   */
  _handleTodosToggleAll(data) {
    this.toggleAll(data.makeCompleted);
  }

  /**
   * @protected
   */
  _handleTodosClearCompleted() {
    this.deleteCompleted();
  }

  /**
   * Informs about an update
   * @protected
   */
  inform() {
    let todos = this.state.todos;

    if (!todos) {
      return;
    }

    this.emit(EVENTS.TodosUpdatedList, {
      completed: todos.filter(item => item.isCompleted).length,
      size: todos.length
    });
  }

  /**
   * Adds a new todo
   * @param {String} text
   * @returns {Promise}
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    return API.create(GATE, {
      text,
      isCompleted: false
    }).then(data => this.setState({ todos: data.items }));
  }

  /**
   * Updates a todo
   * @param {Number} id
   * @param {String} text
   * @returns {Promise}
   */
  updateTodo(id, text) {
    if (!text) {
      return;
    }

    return API.update(`${GATE}/edit`, { text }, { id })
      .then(data => this.setState({ todos: data.items }));
  }

  /**
   * Deletes a todo
   * @param {Number} id
   * @returns {Promise}
   */
  deleteTodo(id) {
    return API.remove(GATE, { id })
      .then(data => this.setState({ todos: data.items }));
  }

  /**
   * Deletes completed todos
   * @returns {Promise}
   */
  deleteCompleted() {
    let todos = this.state.todos;

    if (!todos) {
      return;
    }

    return API.remove(GATE, {
      id: todos.filter(item => item.isCompleted).map(item => item.id)
    }).then(data => this.setState({ todos: data.items }));
  }

  /**
   * Toggles a todo
   * @param {Number} id
   * @param {Boolean} isCompleted
   * @returns {Promise}
   */
  toggleTodo(id, isCompleted) {
    return API.update(`${GATE}/toggle`, { isCompleted }, { id })
      .then(data => this.setState({ todos: data.items }));
  }

  /**
   * Toggles all todos
   * @param {Boolean} isCompleted
   * @returns {Promise}
   */
  toggleAll(isCompleted) {
    let todos = this.state.todos;

    if (!todos) {
      return;
    }

    return API.update(`${GATE}/toggle`, { isCompleted }, {
      id: todos.map(item => item.id)
    }).then(data => this.setState({ todos: data.items }));
  }
}
