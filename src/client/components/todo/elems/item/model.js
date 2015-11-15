import Model from 'lib/component-model';
import Dispatcher, { EVENTS } from 'lib/dispatcher';

export default class TodoItemModel extends Model {
  /**
   * Adds a new todo
   * @param {Boolean} makeCompleted
   */
   toggle(makeCompleted) {
     Dispatcher.emit(EVENTS.TodoToggleItem, {
       id: this.props.id,
       makeCompleted
     });
   }
}
