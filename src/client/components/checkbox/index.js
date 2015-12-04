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
        className={this.styles.checkbox}
        checked={props.isChecked}
        onChange={props.onChange}
      />
    );
  }
}

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  isChecked: false
};
