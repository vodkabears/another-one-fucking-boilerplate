import Component, { PropTypes } from 'lib/component';
import styles from './styles.css';

export default class Input extends Component {
  /**
   * @override
   */
  render() {
    let props = this.props;

    return (
      <input
        type="text"
        className={this._styles.input}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    );
  }
}

/**
 * @static
 * @type {Object}
 */
Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

/**
 * @static
 * @type {Object}
 */
Input.defaultProps = { styles };
