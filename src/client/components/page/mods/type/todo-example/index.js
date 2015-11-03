import React, { PropTypes } from 'react';
import Todo from 'client/components/todo';
import styles from './styles.css';

export default class PageTypeTodoExample extends React.Component {
  render() {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>{this.props.title}</h1>
        <Todo />
      </div>
    );
  }
}

PageTypeTodoExample.propTypes = {
  title: PropTypes.string
};

PageTypeTodoExample.defaultProps = {
  title: 'todos'
};
