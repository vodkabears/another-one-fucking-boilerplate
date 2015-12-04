import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import Todo from 'client/components/todo';
import activeParams from 'lib/params/todo-filters';
import styles from './styles.css';

export default class PageTypeTodoExample extends Page {
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

/**
 * @static
 * @type {Object}
 */
PageTypeTodoExample.propTypes = Object.assign({}, Page.propTypes, {
  title: PropTypes.string
});

/**
 * @static
 * @type {Object}
 */
PageTypeTodoExample.defaultProps = Object.assign({}, Page.defaultProps, {
  activeParams,
  title: 'todos'
});

PageTypeTodoExample.styles = styles;
