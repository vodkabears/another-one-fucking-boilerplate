import React, { PropTypes } from 'react';
import styles from './styles.css';

export default class Input extends React.Component {
  render() {
    return (
      <input className={this.props.styles.input} type="text" placeholder={this.props.placeholder} />
    );
  }
}

Input.propTypes = {
  styles: PropTypes.object,
  placeholder: PropTypes.string
};

Input.defaultProps = { styles };
