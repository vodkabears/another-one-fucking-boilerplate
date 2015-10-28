import React, { PropTypes } from 'react';
import GoogleAnalyticsElem from './elems/google-analytics';
import YandexMetricaElem from './elems/yandex-metrica';

export default class Html extends React.Component {
  render() {
    var bundle = this.props.bundle;

    return (
      <html lang={this.props.lang}>
        <head>
          <meta charsSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{this.props.title}</title>
          <meta name="description" content={this.props.description} />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          <link rel="stylesheet" href={`/assets/${bundle.css}`} />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          <script src={`/assets/${bundle.js}`}></script>
          <GoogleAnalyticsElem id="UA-XXXXX-X" />
          <YandexMetricaElem id="XXXXXXXX" />
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
