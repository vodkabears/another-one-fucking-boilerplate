import Model from 'lib/component-model';
import EVENTS from 'lib/events';

export default class TodosHeaderModel extends Model {
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
      isCheckboxChecked: size > 0 && data.completed === size
    });
  }

  /**
   * Orders to create a new todo
   * @param {String} text
   */
  createTodo(text) {
    this.emit(EVENTS.TodosCreateItem, { text });

    this.setState({
      input: '',
      isCheckboxChecked: false
    });
  }

  /**
   * Syncs changes in the input
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
    this.emit(EVENTS.TodosToggleAll, { makeCompleted });

    this.setState({ isCheckboxChecked: makeCompleted });
  }
}
