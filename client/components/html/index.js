import Component, { PropTypes } from 'lib/component';
import HtmlYandexMetrica from './elems/yandex-metrica';
import HtmlGoogleAnalytics from './elems/google-analytics';
import t from './i18n';

export default class Html extends Component {
  /**
   * @override
   */
  render() {
    let props = this.props;
    let data = props.data;
    let bundle = props.bundle;
    let pageName = props.pageName;

    return (
      <html lang={props.lang}>
        <head>
          <meta charsSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{t(`${pageName}_title`) || t('default_title')}</title>
          <meta name="description" content={t(`${pageName}_description`) || t('default_description')} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link rel="stylesheet" href={`/assets/${bundle.css}`} />
        </head>
        <body data-initial={JSON.stringify(data)}>
          <div id="app" dangerouslySetInnerHTML={{ __html: props.body }} />
          <script
            dangerouslySetInnerHTML={{ __html: 'var INITIAL_DATA = JSON.parse(document.body.getAttribute("data-initial"));' }}>
          </script>
          <script src={`/assets/${bundle.js}`}></script>
          <HtmlGoogleAnalytics id="UA-XXXXX-X" />
          <HtmlYandexMetrica id="XXXXXXXX" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  lang: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};
