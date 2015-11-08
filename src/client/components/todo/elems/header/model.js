import { Dispatcher, EVENTS } from 'lib/dispatcher';

export default class TodoHeaderModel {
  constructor(view) {
    this._view = view;
  }

  toggleAll(makeCompleted) {
    Dispatcher.emit(EVENTS.TodoToggleAll, { makeCompleted });
  }

  syncInputText(text) {
    this._view.setState({ input: text });
  }

  createTodo(text) {
    Dispatcher.emit(EVENTS.TodoItemCreate, { text });
    this._view.setState({ input: '' });
  }
}
