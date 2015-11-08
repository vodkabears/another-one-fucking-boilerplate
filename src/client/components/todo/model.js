import { Dispatcher, EVENTS } from 'lib/dispatcher';

export default class TodoModel {
  constructor(view) {
    this._view = view;

    this._todoItemCreateHandler = this._handleTodoItemCreate.bind(this);
    this._todoToggleAllHandler = this._handleTodoToggleAll.bind(this);

    Dispatcher
      .on(EVENTS.TodoItemCreate, this._todoItemCreateHandler)
      .on(EVENTS.TodoToggleAll, this._todoToggleAllHandler);
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
      .off(EVENTS.TodoItemCreate, this._todoItemCreateHandler)
      .off(EVENTS.TodoToggleAll, this._todoToggleAllHandler);
  }
}
