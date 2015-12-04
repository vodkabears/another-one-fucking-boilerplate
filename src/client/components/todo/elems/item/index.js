import Component, { PropTypes } from 'lib/component';
import CheckboxTypeTodoItem from 'client/components/checkbox/mods/type/todo-item';
import InputTypeTodoItem from 'client/components/input/mods/type/todo-item';
import Model from './model';
import styles from './styles.css';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

export default class TodoItem extends Component {
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = {
      input: '',
      isEditing: false
    };
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleCheckboxChange(e) {
    this._model.toggle(e.target.checked);
  }

  /**
   * @protected
   */
  _handleDeleteButtonClick() {
    this._model.remove();
  }

  /**
   * @protected
   */
  _handleLabelDoubleClick() {
    this._model.startEditing();
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputBlur() {
    this._model.saveChanges();
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputChange(e) {
    this._model.syncInputText(e.target.value);
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputKeyDown(e) {
    let key = e.which;

    if (key === ESCAPE_KEY) {
      this._model.cancelEditing();
    } else if (key === ENTER_KEY) {
      this._model.saveChanges();
    }
  }

  /**
   * @override
   */
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isEditing && this.state.isEditing) {
      this.refs.input.focus();
    }
  }

  /**
   * @override
   */
  render() {
    let props = this.props;
    let isCompleted = props.isCompleted;
    let stls = this._styles;
    let todoItemStyles;

    if (!props.isVisible) {
      todoItemStyles = stls.todoItemIsHidden;
    } else if (this.state.isEditing) {
      todoItemStyles = stls.todoItemIsEditing;
    } else if (isCompleted) {
      todoItemStyles = stls.todoItemIsCompleted;
    } else {
      todoItemStyles = stls.todoItem;
    }

    return (
      <li className={todoItemStyles}>
        <div className={stls.view}>
          <CheckboxTypeTodoItem
            isChecked={isCompleted}
            onChange={this._handleCheckboxChange.bind(this)}
          />
          <label
            className={stls.label}
            onDoubleClick={this._handleLabelDoubleClick.bind(this)}>
            {this.props.text}
          </label>
          <button
            className={stls.deleteButton}
            onClick={this._handleDeleteButtonClick.bind(this)}>
          </button>
        </div>
        <div className={stls.edit}>
          <InputTypeTodoItem
            ref="input"
            value={this.state.input}
            onBlur={this._handleInputBlur.bind(this)}
            onChange={this._handleInputChange.bind(this)}
            onKeyDown={this._handleInputKeyDown.bind(this)}
          />
        </div>
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
  text: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  isCompleted: PropTypes.bool
};

/**
 * @static
 * @type {Object}
 */
TodoItem.defaultProps = {
  isVisible: true,
  isCompleted: false
};

TodoItem.styles = styles;
TodoItem.Model = Model;
