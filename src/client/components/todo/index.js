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
    return (
      <section className={this._styles.todo}>
        <TodoHeader />
        <TodoList query={this.props.query} />
        <TodoFooter />
      </section>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
Todo.propTypes = {
  query: PropTypes.object.isRequired,
  title: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
Todo.defaultProps = {
  title: 'todos'
};

Todo.styles = styles;
