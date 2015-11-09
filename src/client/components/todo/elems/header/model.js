import Model from 'lib/component-model';
import Dispatcher, { EVENTS } from 'lib/dispatcher';

export default class TodoHeaderModel extends Model {
  /**
   * Orders to create a new todo
   * @param {String} text
   */
  createTodo(text) {
    Dispatcher.emit(EVENTS.TodoItemCreate, { text });
    this.setState({ input: '' });
  }

  /**
   * Sync changes in the input
   * @param {String} text
   */
  syncInputText(text) {
    this.setState({ input: text });
  }

  /**
   * Orders to toggle all todos
   * @param {Boolean} makeCompleted
   */
  toggleAll(makeCompleted) {
    Dispatcher.emit(EVENTS.TodoToggleAll, { makeCompleted });
  }
}
