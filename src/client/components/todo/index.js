import Component, { PropTypes } from 'lib/component';
import TodoHeader from './elems/header';
import TodoModel from './model';
import styles from './styles.css';

export default class Todo extends Component {
  render() {
    return (
      <section className={this._styles.todo}>
        <TodoHeader />
      </section>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string
};

Todo.defaultProps = {
  styles,
  model: TodoModel,
  title: 'todos'
};
