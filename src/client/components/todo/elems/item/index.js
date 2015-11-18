import Component, { PropTypes } from 'lib/component';
import CheckboxTypeTodoItem from 'client/components/checkbox/mods/type/todo-item';
import TodoItemModel from './model.js';
import styles from './styles.css';

export default class TodoItem extends Component {
  /**
   * Handles checkbox 'change' event
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleCheckboxChange(e) {
    this._model.toggle(e.target.checked);
  }

  /**
   * Handles delete button 'click' event
   * @protected
   */
  _handleDeleteButtonClick() {
    this._model.delete();
  }

  /**
   * @override
   */
  render() {
    let isCompleted = this.props.isCompleted;
    let stls = this._styles;

    return (
      <li className={stls.todoItem}>
        <CheckboxTypeTodoItem
          isChecked={isCompleted}
          onChange={this._handleCheckboxChange.bind(this)}
        />
        <label className={isCompleted ? stls.labelIsCrossedOut : stls.label}>
          {this.props.text}
        </label>
        <button
          className={stls.deleteButton}
          onClick={this._handleDeleteButtonClick.bind(this)}>
        </button>
      </li>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  isCompleted: PropTypes.bool
};

/**
 * @static
 * @type {Object}
 */
TodoItem.defaultProps = {
  styles,
  model: TodoItemModel,
  isCompleted: false
};
