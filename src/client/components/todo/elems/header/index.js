import Component, { PropTypes } from 'lib/component';
import InputTypeTodoHeader from 'client/components/input/mods/type/todo-header';
import CheckboxTypeTodoHeader from 'client/components/checkbox/mods/type/todo-header';
import TodoHeaderModel from './model';
import styles from './styles.css';

const ENTER_KEY = 13;

export default class TodoHeader extends Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    this.state = { input: '' };
  }

  /**
   * Handles checkbox 'change' event
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleCheckboxChange(e) {
    this._model.toggleAll(e.target.checked);
  }

  /**
   * Handles input 'change' event
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputChange(e) {
    this._model.syncInputText(e.target.value);
  }

  /**
   * Handles checkbox 'keyDown' event
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    this._model.createTodo(e.target.value);
  }

  /**
   * @override
   */
  render() {
    return (
      <header className={this._styles.todoHeader}>
        <CheckboxTypeTodoHeader onChange={this._handleCheckboxChange.bind(this)} />
        <InputTypeTodoHeader
          value={this.state.input}
          placeholder={this.props.placeholder}
          onChange={this._handleInputChange.bind(this)}
          onKeyDown={this._handleInputKeyDown.bind(this)}
        />
      </header>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
TodoHeader.propTypes = {
  placeholder: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
TodoHeader.defaultProps = {
  styles,
  model: TodoHeaderModel,
  placeholder: 'What needs to be done?'
};
