import { Link } from 'react-router';
import { PropTypes } from 'lib/component';
import Page from 'client/components/page';
import Model from './model';
import styles from './styles.css';

export default class PageTypeWelcome extends Page {
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
    let props = this.props;

    return (
      <div>
        <div className={stls.page}>
          <div className={stls.image}></div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <Link to="/examples/todos">Todo-list example</Link>
        </div>
      </div>
    );
  }
}

PageTypeWelcome.propTypes = Object.assign({}, Page.propTypes, {
  title: PropTypes.string,
  description: PropTypes.string
});

PageTypeWelcome.defaultProps = Object.assign({}, Page.defaultProps, {
  title: 'Boilerplate',
  description: 'Another one'
});

PageTypeWelcome.styles = styles;
PageTypeWelcome.Model = Model;
