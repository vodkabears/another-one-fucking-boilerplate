import Component, { PropTypes } from 'lib/component';
import Checkbox from 'client/components/checkbox';
import Input from 'client/components/input';
import Model from './model';
import styles from './styles.css';

const ENTER_KEY = 13;

export default class TodosHeader extends Component {
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
    this.model.toggleAll(e.target.checked);
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputChange(e) {
    this.model.syncInputText(e.target.value);
  }

  /**
   * @protected
   * @param {SyntheticEvent} e
   */
  _handleInputKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    this.model.createTodo(e.target.value);
  }

  /**
   * @override
   */
  render() {
    let stls = this.styles;
    let state = this.state;

    return (
      <header className={stls.header}>
        <Checkbox
          className={stls.checkbox}
          isChecked={state.isCheckboxChecked}
          onChange={this._handleCheckboxChange.bind(this)}
        />
        <Input
          value={state.input}
          className={stls.input}
          placeholder={this.props.placeholder}
          onChange={this._handleInputChange.bind(this)}
          onKeyDown={this._handleInputKeyDown.bind(this)}
        />
      </header>
    );
  }
}

TodosHeader.propTypes = {
  placeholder: PropTypes.string
};

TodosHeader.defaultProps = {
  placeholder: 'What needs to be done?'
};

TodosHeader.styles = styles;
TodosHeader.Model = Model;
