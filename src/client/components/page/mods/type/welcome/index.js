import Component, { PropTypes } from 'lib/component';
import { Link } from 'react-router';
import styles from './styles.css';

export default class PageTypeWelcome extends Component {
  constructor(props) {
    super(props, null, styles);
  }

  render() {
    return (
      <div>
        <div className={this._styles.page}>
          <div className={this._styles.image}></div>
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <Link to="/examples/todo">Todo-list example</Link>
        </div>
      </div>
    );
  }
}

PageTypeWelcome.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

PageTypeWelcome.defaultProps = {
  styles,
  title: 'Boilerplate',
  description: 'Another one'
};
