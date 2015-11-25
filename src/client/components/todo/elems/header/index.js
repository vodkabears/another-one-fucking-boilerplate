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

    /**
     * @type {Object}
     */
    this.state = {
      input: '',
      isCheckboxChecked: false
    };
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleCheckboxChange(e) {
    this._model.toggleAll(e.target.checked);
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
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    this._model.createTodo(e.target.value);
  }

  /**
   * @override
   */
  render() {
    let state = this.state;

    return (
      <header className={this._styles.todoHeader}>
        <CheckboxTypeTodoHeader
          isChecked={state.isCheckboxChecked}
          onChange={this._handleCheckboxChange.bind(this)}
        />
        <InputTypeTodoHeader
          value={state.input}
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
