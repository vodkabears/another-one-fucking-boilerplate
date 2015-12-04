import Component, { PropTypes } from 'lib/component';
import HtmlYandexMetrica from './elems/yandex-metrica';
import HtmlGoogleAnalytics from './elems/google-analytics';

export default class Html extends Component {
  /**
   * @override
   */
  render() {
    let props = this.props;
    let bundle = props.bundle;

    return (
      <html lang={props.lang}>
        <head>
          <meta charsSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{props.title}</title>
          <meta name="description" content={props.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link rel="stylesheet" href={`/assets/${bundle.css}`} />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: props.body }} />
          <script src={`/assets/${bundle.js}`}></script>
          <HtmlGoogleAnalytics id="UA-XXXXX-X" />
          <HtmlYandexMetrica id="XXXXXXXX" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string.isRequired
};

Html.defaultProps = {
  lang: 'en',
  title: 'Boilerplate',
  description: 'OMFG. Another one boilerplate.'
};
