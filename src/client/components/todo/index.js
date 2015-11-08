import React, { PropTypes } from 'react';
import TodoHeader from './elems/header';
import TodoModel from './model';
import styles from './styles.css';

export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this._model = new TodoModel(this);
  }

  componentWillUnmount() {
    this._model.destroy();
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
