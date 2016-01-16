import Component from 'lib/component';
import TodoFilter from '../filter';
import styles from './styles.css';

export default class TodoFilters extends Component {
  /**
   * @override
   */
  render() {
    return (
      <ul className={this.styles.filters}>
        <li><TodoFilter label="All" value="" /></li>
        <li><TodoFilter label="Active" value="active" /></li>
        <li><TodoFilter label="Completed" value="completed" /></li>
      </ul>
    );
  }
}

TodoFilters.styles = styles;
