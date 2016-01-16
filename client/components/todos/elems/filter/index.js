import { Link } from 'react-router';
import Component, { PropTypes } from 'lib/component';
import styles from './styles.css';

export default class TodosFilter extends Component {
  /**
   * @override
   */
  render() {
    let stls = this.styles;
    let props = this.props;
    let value = props.value;
    let url = '/examples/todos' + (value ? '/' + value : value);

    return (
      <Link
        className={stls.filter}
        activeClassName={stls.filterIsActive}
        to={url}>
        {props.label}
      </Link>
    );
  }
}

TodosFilter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

TodosFilter.styles = styles;
