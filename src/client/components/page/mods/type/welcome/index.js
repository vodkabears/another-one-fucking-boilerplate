import Component, { PropTypes } from 'lib/component';
import { Link } from 'react-router';
import styles from './styles.css';

export default class PageTypeWelcome extends Component {
  /**
   * @override
   */
  render() {
    let stls = this._styles;
    let props = this.props;

    return (
      <div>
        <div className={stls.page}>
          <div className={stls.image}></div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <Link to="/examples/todo">Todo-list example</Link>
        </div>
      </div>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
PageTypeWelcome.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

/**
 * @static
 * @type {Object}
 */
PageTypeWelcome.defaultProps = {
  styles,
  title: 'Boilerplate',
  description: 'Another one'
};
