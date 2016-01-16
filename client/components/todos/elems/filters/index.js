import Component from 'lib/component';
import TodosFilter from '../filter';
import styles from './styles.css';

export default class TodosFilters extends Component {
  /**
   * @override
   */
  render() {
    return (
      <ul className={this.styles.filters}>
        <li><TodosFilter label="All" value="" /></li>
        <li><TodosFilter label="Active" value="active" /></li>
        <li><TodosFilter label="Completed" value="completed" /></li>
      </ul>
    );
  }
}

TodosFilters.styles = styles;
