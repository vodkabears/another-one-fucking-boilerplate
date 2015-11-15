import Component, { PropTypes } from 'lib/component';
import TodoItem from '../item';
import TodoListModel from './model';
import styles from './styles.css';

export default class TodoList extends Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = { todoItems: [] };
  }

  /**
   * @override
   */
  render() {
    let todoItems = this.state.todoItems.map(item => {
      return (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          isCompleted={item.isCompleted}
        />
      );
    });

    return (
      <ul className={this._styles.todoList}>
        {todoItems}
      </ul>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
TodoList.propTypes = {
  title: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
TodoList.defaultProps = {
  styles,
  model: TodoListModel,
  title: 'todos'
};
