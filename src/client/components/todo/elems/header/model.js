import Model from 'lib/component-model';
import { Dispatcher, EVENTS } from 'lib/dispatcher';

export default class TodoHeaderModel extends Model {
  toggleAll(makeCompleted) {
    Dispatcher.emit(EVENTS.TodoToggleAll, { makeCompleted });
  }

  syncInputText(text) {
    this.setState({ input: text });
  }

  createTodo(text) {
    Dispatcher.emit(EVENTS.TodoItemCreate, { text });
    this.setState({ input: '' });
  }
}
