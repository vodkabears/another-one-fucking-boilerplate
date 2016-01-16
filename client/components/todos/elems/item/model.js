import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodosItemModel extends Model {
  /**
   * Toggles the todo
   * @param {Boolean} makeCompleted
   */
   toggle(makeCompleted) {
     this.emit(EVENTS.TodosToggleItem, {
       id: this.props.id,
       makeCompleted
     });
   }

   /**
    * Deletes the todo
    */
   remove() {
     this.emit(EVENTS.TodosDeleteItem, { id: this.props.id });
   }

   /**
    * Starts editing the todo
    */
   startEditing() {
     this.setState({
       input: this.props.text,
       isEditing: true
     });
   }

   /**
    * Cancels editing the todo
    */
   cancelEditing() {
     this.setState({ isEditing: false });
   }

   /**
    * Saves changes after editing
    */
   saveChanges() {
     this.emit(EVENTS.TodosUpdateItem, {
       id: this.props.id,
       text: this.state.input
     });

     this.setState({ isEditing: false });
   }

   /**
    * Syncs changes in the input
    * @param {String} text
    */
   syncInputText(text) {
     this.setState({ input: text });
   }
}
