import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodoItemModel extends Model {
  /**
   * Adds a new todo
   * @param {Boolean} makeCompleted
   */
   toggle(makeCompleted) {
     this.emit(EVENTS.TodoToggleItem, {
       id: this.props.id,
       makeCompleted
     });
   }
}
