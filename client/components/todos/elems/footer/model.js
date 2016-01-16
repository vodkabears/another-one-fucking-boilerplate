import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodosFooterModel extends Model {
  /**
   * @override
   */
  constructor(view) {
    super(view);

    this.on(EVENTS.TodosUpdatedList, this._handleTodosUpdatedList);
  }

  /**
   * @protected
   * @param {Object} data
   *  @param {Number} data.completed
   *  @param {Number} data.size
   */
  _handleTodosUpdatedList(data) {
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
    this.emit(EVENTS.TodosClearCompleted);
  }
}
