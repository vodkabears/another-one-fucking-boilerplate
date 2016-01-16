import Component, { PropTypes } from 'lib/component';
import TodosHeader from './elems/header';
import TodosFooter from './elems/footer';
import TodosList from './elems/list';
import styles from './styles.css';

export default class Todos extends Component {
  /**
   * @override
   */
  render() {
    let props = this.props;

    return (
      <section className={this.styles.todos}>
        <TodosHeader />
        <TodosList data={props.data} query={props.query} />
        <TodosFooter />
      </section>
    );
  }
}

Todos.propTypes = {
  data: PropTypes.object,
  query: PropTypes.object.isRequired,
  title: PropTypes.string
};

Todos.defaultProps = {
  title: 'todos'
};

Todos.styles = styles;
