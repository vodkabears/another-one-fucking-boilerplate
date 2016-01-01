import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import Todo from 'client/components/todo';
import Model from './model';
import styles from './styles.css';

export default class PageTypeTodoExample extends Page {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = { SEO: props.SEO };
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

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>{this.props.title}</h1>
        <Todo query={this.props.params} />
      </div>
    );
  }
}

PageTypeTodoExample.propTypes = Object.assign({}, Page.propTypes, {
  title: PropTypes.string
});

PageTypeTodoExample.defaultProps = Object.assign({}, Page.defaultProps, {
  title: 'todos'
});

PageTypeTodoExample.styles = styles;
PageTypeTodoExample.Model = Model;
