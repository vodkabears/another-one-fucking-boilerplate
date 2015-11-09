import Component, { PropTypes } from 'lib/component';
import Todo from 'client/components/todo';
import styles from './styles.css';

export default class PageTypeTodoExample extends Component {
  /**
   * @override
   */
  render() {
    let stls = this._styles;

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>{this.props.title}</h1>
        <Todo />
      </div>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
PageTypeTodoExample.propTypes = {
  title: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
PageTypeTodoExample.defaultProps = {
  styles,
  title: 'todos'
};
