import Component, { PropTypes } from 'lib/component';
import TodoHeader from './elems/header';
import TodoFooter from './elems/footer';
import TodoList from './elems/list';
import styles from './styles.css';

export default class Todo extends Component {
  /**
   * @override
   */
  render() {
    let props = this.props;

    return (
      <section className={this.styles.todo}>
        <TodoHeader />
        <TodoList data={props.data} query={props.query} />
        <TodoFooter />
      </section>
    );
  }
}

Todo.propTypes = {
  data: PropTypes.object,
  query: PropTypes.object.isRequired,
  title: PropTypes.string
};

Todo.defaultProps = {
  title: 'todos'
};

Todo.styles = styles;
