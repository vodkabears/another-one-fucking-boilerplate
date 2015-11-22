import Component, { PropTypes } from 'lib/component';
import './styles.css';

export default class Page extends Component {
  /**
   * @override
   */
  shouldComponentUpdate(nextProps) {
    let props = this.props;
    let activeParams = props.activeParams;

    if (!activeParams) {
      return true;
    }

    let params = Object.assign({}, props.location.query, props.params);
    let nextParams = Object.assign({}, nextProps.location.query, nextProps.params);

    return activeParams.some(param => params[param] !== nextParams[param]);
  }

  /**
   * @override
   */
  componentDidMount() {
    document.body.className = this._styles.body || '';
  }
}

/**
 * @static
 * @type {Object}
 */
Page.propTypes = {
  activeParams: PropTypes.array
};
