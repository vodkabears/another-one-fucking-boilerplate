import Component, { PropTypes } from 'lib/component';
import styles from './styles.css';

export default class Input extends Component {
  render() {
    return (
      <input
        type="text"
        className={this._styles.input}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

Input.defaultProps = { styles };
