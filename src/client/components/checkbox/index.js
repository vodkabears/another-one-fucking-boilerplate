import React, { PropTypes } from 'react';

export default class Checkbox extends React.Component {
  render() {
    return (
      <input className={this.props.styles.checkbox} type="checkbox" />
    );
  }
}

Checkbox.propTypes = {
  styles: PropTypes.object
};

Checkbox.defaultProps = {
  styles: {}
};
