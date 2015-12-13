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
        className={props.className}
        checked={props.isChecked}
        onChange={props.onChange}
      />
    );
  }
}

Checkbox.propTypes = {
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  isChecked: false
};
