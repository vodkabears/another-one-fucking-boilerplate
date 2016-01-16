import Page from 'client/components/page';
import styles from './styles.css';

export default class PageType404 extends Page {
  /**
   * @override
   */
  render() {
    let stls = this.styles;

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>Not found</h1>
      </div>
    );
  }
}

PageType404.styles = styles;
