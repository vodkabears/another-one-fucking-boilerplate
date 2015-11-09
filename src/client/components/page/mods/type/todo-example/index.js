import Component, { PropTypes } from 'lib/component';
import Todo from 'client/components/todo';
import styles from './styles.css';

export default class PageTypeTodoExample extends Component {
  render() {
    return (
      <div className={this._styles.page}>
        <h1 className={this._styles.title}>{this.props.title}</h1>
        <Todo />
      </div>
    );
  }
}

PageTypeTodoExample.propTypes = {
  title: PropTypes.string
};

PageTypeTodoExample.defaultProps = {
  styles,
  title: 'todos'
};
