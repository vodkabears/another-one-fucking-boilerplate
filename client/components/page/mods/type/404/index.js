import Page from 'client/components/page';
import styles from './styles.css';
import i18n from './i18n';

export default class PageType404 extends Page {
  /**
   * @override
   */
  render() {
    let stls = this.styles;

    return (
      <div className={stls.page}>
        <h1 className={stls.title}>{this.t('not_found')}</h1>
      </div>
    );
  }
}

PageType404.i18n = i18n;
PageType404.styles = styles;
