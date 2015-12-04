import { Link } from 'react-router';
import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import styles from './styles.css';

export default class PageTypeWelcome extends Page {
  /**
   * @override
   */
  render() {
    let stls = this.styles;
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
PageTypeWelcome.propTypes = Object.assign({}, Page.propTypes, {
  title: PropTypes.string,
  description: PropTypes.string
});

/**
 * @static
 * @type {Object}
 */
PageTypeWelcome.defaultProps = Object.assign({}, Page.defaultProps, {
  title: 'Boilerplate',
  description: 'Another one'
});

PageTypeWelcome.styles = styles;
