import React, { PropTypes } from 'react';
import TodoHeader from './elems/header';
import styles from './styles.css';

export default class Todo extends React.Component {
  render() {
    return (
      <section className={styles.todo}>
        <TodoHeader />
      </section>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string
};

Todo.defaultProps = {
  title: 'todos'
};
