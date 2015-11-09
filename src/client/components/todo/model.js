import Model from 'lib/component-model';
import Dispatcher, { EVENTS } from 'lib/dispatcher';

export default class TodoModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    Dispatcher
      .on(EVENTS.TodoItemCreate, this.bindToThis(this._handleTodoItemCreate))
      .on(EVENTS.TodoToggleAll, this.bindToThis(this._handleTodoToggleAll));
  }

  /**
   * Handles 'TodoItemCreate' event
   * @protected
   * @param {Object} data
   *  @param {String} data.text
   */
  _handleTodoItemCreate(data) {
    this.addTodo(data.text);
  }

  /**
   * Handles 'TodoToggleAll' event
   * @protected
   * @param {Object} data
   *  @param {Boolean} data.makeCompleted
   */
  _handleTodoToggleAll(data) {
    this.toggleAll(data.makeCompleted);
  }

  /**
   * Adds a new todo
   * @param {String} text
   */
  addTodo(text) {
    alert('Create: ' + text.trim());
  }

  /**
   * Makes all todos completed/not completed
   * @param {Boolean} makeComplited
   */
  toggleAll(makeComplited) {
    alert('Are completed? – ' + makeComplited);
  }

  /**
   * @override
   */
  destroy() {
    super.destroy();

    Dispatcher
      .off(EVENTS.TodoItemCreate, this.bindToThis(this._handleTodoItemCreate))
      .off(EVENTS.TodoToggleAll, this.bindToThis(this._handleTodoToggleAll));
  }
}
