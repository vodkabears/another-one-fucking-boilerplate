import Component, { PropTypes } from 'lib/component';

export default class Checkbox extends Component {
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

Checkbox.defaultProps = {
  onChange: PropTypes.func
};
