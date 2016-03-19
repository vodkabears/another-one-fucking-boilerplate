import Component from 'lib/component';
import TodosFilter from '../filter';
import styles from './styles.css';
import i18n from './i18n';

export default class TodosFilters extends Component {
  /**
   * @override
   */
  render() {
    let t = this.t;

    return (
      <ul className={this.styles.filters}>
        <li><TodosFilter label={t('all')} value="" /></li>
        <li><TodosFilter label={t('active')} value="active" /></li>
        <li><TodosFilter label={t('completed')} value="completed" /></li>
      </ul>
    );
  }
}

TodosFilters.i18n = i18n;
TodosFilters.styles = styles;
