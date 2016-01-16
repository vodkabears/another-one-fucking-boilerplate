import Component, { PropTypes } from 'lib/component';
import TodosItem from '../item';
import Model from './model';
import styles from './styles.css';

export default class TodosList extends Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    let data = this.props.data;

    /**
     * @type {Object}
     */
    this.state = { todos: data && data.items };
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

    !this.state.todos && data && this.setState({ todos: data.items });
  }

  /**
   * @override
   */
  render() {
    let items = this.state.todos;
    let state = this.props.query.state;
    let todosItems = items && items.map(item => {
      let isCompleted = item.isCompleted;
      let isVisible = !state ||
        state === 'active' && !isCompleted ||
        state === 'completed' && isCompleted;

      return (
        <TodosItem
          key={item.id}
          id={item.id}
          text={item.text}
          isCompleted={isCompleted}
          isVisible={isVisible}
        />
      );
    });

    return (
      <ul className={this.styles.list}>
        {todosItems}
      </ul>
    );
  }
}

TodosList.propTypes = {
  data: PropTypes.object,
  query: PropTypes.object.isRequired,
  title: PropTypes.string
};

TodosList.defaultProps = {
  title: 'todos'
};

TodosList.styles = styles;
TodosList.Model = Model;
