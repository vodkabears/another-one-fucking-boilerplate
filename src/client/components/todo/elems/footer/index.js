import Component from 'lib/component';
import TodoFilters from '../filters';
import TodoFooterModel from './model';
import styles from './styles.css';

export default class TodoFooter extends Component {
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
    this._model.clearCompleted();
  }

  /**
   * @override
   */
  render() {
    let stls = this._styles;
    let state = this.state;
    let uncompleted = state.uncompleted;
    let todoFooterStyles;

    if (state.isHidden) {
      todoFooterStyles = stls.todoFooterIsHidden;
    } else if (state.hasCompleted) {
      todoFooterStyles = stls.todoFooterHasCompleted;
    } else {
      todoFooterStyles = stls.todoFooter;
    }

    return (
      <footer
        className={todoFooterStyles}>
        <span className={stls.counter}>{uncompleted} items left</span>
        <TodoFilters />
        <button
          className={stls.clearButton}
          onClick={this._handleClearButtonClick.bind(this)}>
          Clear completed
        </button>
      </footer>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
TodoFooter.defaultProps = {
  styles,
  model: TodoFooterModel
};
