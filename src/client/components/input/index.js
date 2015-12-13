import Component, { PropTypes } from 'lib/component';
import styles from './styles.css';

export default class Input extends Component {
  /**
   * Focuses the input
   */
  focus() {
    let input = this.refs.input;
    let valueLen = input.value.length;

    input.focus();
    input.setSelectionRange(valueLen, valueLen);
  }

  /**
   * @override
   */
  render() {
    let props = this.props;

    return (
      <input
        ref="input"
        type="text"
        value={props.value}
        className={props.className}
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    );
  }
}

Input.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

Input.defaultProps = {
  className: styles.input
};

Input.styles = styles;
