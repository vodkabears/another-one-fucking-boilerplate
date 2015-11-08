import Model from 'lib/component-model';
import { Dispatcher, EVENTS } from 'lib/dispatcher';

export default class TodoModel extends Model {
  constructor(view) {
    super(view);

    Dispatcher
      .on(EVENTS.TodoItemCreate, this.bindToThis(this._handleTodoItemCreate))
      .on(EVENTS.TodoToggleAll, this.bindToThis(this._handleTodoToggleAll));
  }

  _handleTodoItemCreate(data) {
    this._addTodo(data.text);
  }

  _handleTodoToggleAll(data) {
    this._toggleAll(data.makeCompleted);
  }

  _addTodo(text) {
    alert('Create: ' + text.trim());
  }

  _toggleAll(makeComplited) {
    alert('Are completed? – ' + makeComplited);
  }

  destroy() {
    Dispatcher
      .off(EVENTS.TodoItemCreate, this.bindToThis(this._handleTodoItemCreate))
      .off(EVENTS.TodoToggleAll, this.bindToThis(this._handleTodoToggleAll));
  }
}
