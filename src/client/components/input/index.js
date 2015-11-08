import React, { PropTypes } from 'react';
import styles from './styles.css';

export default class Input extends React.Component {
  render() {
    return (
      <input
        type="text"
        className={this.props.styles.input}
        placeholder={this.props.placeholder}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

Input.propTypes = {
  styles: PropTypes.object,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func
};

Input.defaultProps = { styles };
