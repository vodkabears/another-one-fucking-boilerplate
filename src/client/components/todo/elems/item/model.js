import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodoItemModel extends Model {
  /**
   * Toggles the todo
   * @param {Boolean} makeCompleted
   */
   toggle(makeCompleted) {
     this.emit(EVENTS.TodoToggleItem, {
       id: this.props.id,
       makeCompleted
     });
   }

   /**
    * Deletes the todo
    */
   delete() {
     this.emit(EVENTS.TodoDeleteItem, { id: this.props.id });
   }
}
