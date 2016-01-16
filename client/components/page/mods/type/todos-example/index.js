import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import Todos from 'client/components/todos';
import Model from './model';
import styles from './styles.css';

export default class PageTypeTodosExample extends Page {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = {
      SEO: props.SEO,
      Todos: props.Todos
    };
  }

  /**
   * @override
   */
  componentDidMount() {
    super.componentDidMount();

    INITIAL_DATA || this.model.load();
  }

  /**
   * @override
   */
  render() {
    let stls = this.styles;
    let props = this.props;

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>{props.title}</h1>
        <Todos data={this.state.Todos} query={props.params} />
      </div>
    );
  }
}

PageTypeTodosExample.propTypes = Object.assign({}, Page.propTypes, {
  Todo: PropTypes.object,
  title: PropTypes.string
});

PageTypeTodosExample.defaultProps = Object.assign({}, Page.defaultProps, {
  title: 'todos'
});

PageTypeTodosExample.styles = styles;
PageTypeTodosExample.Model = Model;
