import React, { PropTypes } from 'react';
import styles from './styles.css';

export default class Input extends React.Component {
  render() {
    return (
      <input
        type="text"
        className={this.props.styles.input}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
      />
    );
  }
}

Input.propTypes = {
  styles: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
};

Input.defaultProps = { styles };
