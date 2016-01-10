import Component, { PropTypes } from 'lib/component';
import TodoItem from '../item';
import Model from './model';
import styles from './styles.css';

export default class TodoList extends Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    let data = this.props.data;

    /**
     * @type {Object}
     */
    this.state = { todoItems: data && data.items };
  }

  /**
   * @override
   */
  componentDidMount() {
    this.model.inform();
  }

  /**
   * @override
   */
  componentDidUpdate() {
    this.model.inform();
  }

  /**
   * @override
   */
  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;

    !this.state.todoItems && data && this.setState({ todoItems: data.items });
  }

  /**
   * @override
   */
  render() {
    let items = this.state.todoItems;
    let state = this.props.query.state;
    let todoItems = items && items.map(item => {
      let isCompleted = item.isCompleted;
      let isVisible = !state ||
        state === 'active' && !isCompleted ||
        state === 'completed' && isCompleted;

      return (
        <TodoItem
          key={item.id}
          id={item.id}
          text={item.text}
          isCompleted={isCompleted}
          isVisible={isVisible}
        />
      );
    });

    return (
      <ul className={this.styles.todoList}>
        {todoItems}
      </ul>
    );
  }
}

TodoList.propTypes = {
  data: PropTypes.object,
  query: PropTypes.object.isRequired,
  title: PropTypes.string
};

TodoList.defaultProps = {
  title: 'todos'
};

TodoList.styles = styles;
TodoList.Model = Model;
