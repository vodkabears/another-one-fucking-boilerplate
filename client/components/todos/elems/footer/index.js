import Component from 'lib/component';
import TodosFilters from '../filters';
import Model from './model';
import styles from './styles.css';
import i18n from './i18n';

export default class TodosFooter extends Component {
  /**
   * @override
   */
  constructor(props) {
    super(props);

    /**
     * @type {Object}
     */
    this.state = {
      uncompleted: 0,
      isHidden: true,
      hasCompleted: false
    };
  }

  /**
   * @protected
   */
  _handleClearButtonClick() {
    this.model.clearCompleted();
  }

  /**
   * @override
   */
  render() {
    let t = this.t;
    let stls = this.styles;
    let state = this.state;
    let footerStyles;

    if (state.isHidden) {
      footerStyles = stls.footerIsHidden;
    } else if (state.hasCompleted) {
      footerStyles = stls.footerHasCompleted;
    } else {
      footerStyles = stls.footer;
    }

    return (
      <footer
        className={footerStyles}>
        <span className={stls.counter}>{t('items_left', state.uncompleted)}</span>
        <TodosFilters />
        <button
          className={stls.clearButton}
          onClick={this._handleClearButtonClick.bind(this)}>
          {t('clear_completed')}
        </button>
      </footer>
    );
  }
}

TodosFooter.i18n = i18n;
TodosFooter.styles = styles;
TodosFooter.Model = Model;
