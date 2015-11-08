import React, { PropTypes } from 'react';
import TodoHeader from './elems/header';
import { Dispatcher, EVENTS } from 'lib/dispatcher';
import styles from './styles.css';

export default class Todo extends React.Component {
  _handleTodoItemCreate(data) {
    alert('Create: ' + data.text.trim());
  }

  _handleTodoToggleAll(data) {
    alert('Are completed? – ' + data.areCompleted);
  }

  componentWillMount() {
    this._todoItemCreateHandler = this._handleTodoItemCreate.bind(this);
    this._todoToggleAllHandler = this._handleTodoToggleAll.bind(this);

    Dispatcher
      .on(EVENTS.TodoItemCreate, this._todoItemCreateHandler)
      .on(EVENTS.TodoToggleAll, this._todoToggleAllHandler);
  }

  componentWillUnmount() {
    Dispatcher
      .removeListener(EVENTS.TodoItemCreate, this._todoItemCreateHandler)
      .removeListener(EVENTS.TodoToggleAll, this._todoToggleAllHandler);
  }

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
