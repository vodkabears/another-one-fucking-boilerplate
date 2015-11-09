import Component from 'lib/component';
import styles from './styles.css';

export default class PageType404 extends Component {
  /**
   * @override
   */
  render() {
    let stls = this._styles;

    return (
      <div>
        <div className={stls.page}>
          <h1 className={stls.title}>Not found</h1>
        </div>
      </div>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
PageType404.defaultProps = { styles };
