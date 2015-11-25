import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodoFooterModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    this.on(EVENTS.TodoUpdatedList, this._handleTodoUpdatedList);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} data.completed
   *  @param {Number} data.size
   */
  _handleTodoUpdatedList(data) {
    let size = data.size;

    this.setState({
      uncompleted: size - data.completed,
      hasCompleted: data.completed > 0,
      isHidden: size === 0
    });
  }

  /**
   * Clears completed todos
   */
  clearCompleted() {
    this.emit(EVENTS.TodoClearCompleted);
  }
}
