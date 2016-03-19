import Component, { PropTypes } from 'lib/component';
import './styles.css';

export default class Page extends Component {
  /**
   * Updates the page title
   * @protected
   */
  _updateTitle() {
    let title = this.t('page_title');

    title && (document.title = title);
  }

  /**
   * @override
   */
  componentDidMount() {
    let model = this.model;

    document.body.className = this.styles.body || '';
    this._updateTitle();

    if (!INITIAL_DATA && model && typeof model.load === 'function') {
      model.load();
    }
  }
}

Page.propTypes = {
  location: PropTypes.object
};
