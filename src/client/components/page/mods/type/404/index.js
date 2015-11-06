import React from 'react';
import styles from './styles.css';

export default class PageType404 extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.page}>
          <h1 className={styles.title}>Not found</h1>
        </div>
      </div>
    );
  }
}
