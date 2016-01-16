import Component from 'lib/component';
import TodosFilters from '../filters';
import Model from './model';
import styles from './styles.css';

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
    let stls = this.styles;
    let state = this.state;
    let uncompleted = state.uncompleted;
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
        <span className={stls.counter}>{uncompleted} items left</span>
        <TodosFilters />
        <button
          className={stls.clearButton}
          onClick={this._handleClearButtonClick.bind(this)}>
          Clear completed
        </button>
      </footer>
    );
  }
}

TodosFooter.styles = styles;
TodosFooter.Model = Model;
