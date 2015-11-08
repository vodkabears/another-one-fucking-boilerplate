import React, { PropTypes } from 'react';

export default class Checkbox extends React.Component {
  render() {
    return (
      <input
        type="checkbox"
        className={this.props.styles.checkbox}
        onChange={this.props.onChange}
      />
    );
  }
}

Checkbox.propTypes = {
  styles: PropTypes.object
};

Checkbox.defaultProps = {
  styles: {},
  onChange: PropTypes.func
};
