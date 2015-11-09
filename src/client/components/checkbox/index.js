import Component, { PropTypes } from 'lib/component';

export default class Checkbox extends Component {
  /**
   * @override
   */
  render() {
    return (
      <input
        type="checkbox"
        className={this._styles.checkbox}
        onChange={this.props.onChange}
      />
    );
  }
}

/**
 * @static
 * @type {Object}
 */
Checkbox.defaultProps = {
  onChange: PropTypes.func
};
