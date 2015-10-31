import React, { PropTypes } from 'react';
import styles from './page.css';

export default class Page extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.image}></div>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

Page.defaultProps = {
  title: 'Boilerplate',
  description: 'Another one'
};
