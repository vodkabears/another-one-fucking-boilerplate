import React, { PropTypes } from 'react';
import TodoAdd from './elems/todo-add';
import styles from './styles.css';

export default class Todo extends React.Component {
  render() {
    return (
      <div className={styles.todo}>
        <TodoAdd />
      </div>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string
};

Todo.defaultProps = {
  title: 'todos'
};
