import Component, { PropTypes } from 'lib/component';

export default class Checkbox extends Component {
  /**
   * @override
   */
  render() {
    let props = this.props;

    return (
      <input
        type="checkbox"
        autoComplete="off"
        className={this._styles.checkbox}
        checked={props.isChecked}
        onChange={props.onChange}
      />
    );
  }
}

/**
 * @static
 * @type {Object}
 */
Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
};

/**
 * @static
 * @type {Object}
 */
Checkbox.defaultProps = {
  isChecked: false
};
