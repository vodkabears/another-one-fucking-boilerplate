import Component, { PropTypes } from 'lib/component';
import './styles.css';

export default class Page extends Component {
  /**
   * @override
   */
  componentDidMount() {
    document.body.className = this.styles.body || '';
  }

  /**
   * @override
   */
  componentDidUpdate() {
    let state = this.state;
    let SEO = state && state.SEO;

    SEO && (document.title = SEO.title);
  }
}

Page.propTypes = {
  SEO: PropTypes.object,
  location: PropTypes.object,
  activeParams: PropTypes.array
};
