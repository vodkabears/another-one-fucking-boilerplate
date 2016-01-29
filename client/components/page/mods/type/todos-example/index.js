import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import Todos from 'client/components/todos';
import Loader from 'client/components/loader';
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
      Todos: props.Todos,
      isLoading: false
    };
  }

  /**
   * @override
   */
  render() {
    let stls = this.styles;
    let props = this.props;
    let state = this.state;

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>{props.title}</h1>
        <Todos data={state.Todos} query={props.params} />
        <Loader isLoading={state.isLoading} />
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
