import Component from 'lib/component';
import styles from './styles.css';

export default class PageType404 extends Component {
  render() {
    return (
      <div>
        <div className={this._styles.page}>
          <h1 className={this._styles.title}>Not found</h1>
        </div>
      </div>
    );
  }
}

PageType404.defaultProps = { styles };
