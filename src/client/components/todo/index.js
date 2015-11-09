import Component, { PropTypes } from 'lib/component';
import TodoHeader from './elems/header';
import TodoModel from './model';
import styles from './styles.css';

export default class Todo extends Component {
  /**
   * @override
   */
  render() {
    return (
      <section className={this._styles.todo}>
        <TodoHeader />
      </section>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
Todo.propTypes = {
  title: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
Todo.defaultProps = {
  styles,
  model: TodoModel,
  title: 'todos'
};
