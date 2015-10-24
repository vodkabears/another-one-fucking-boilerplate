import React, { PropTypes } from 'react';

export default class Html extends React.Component {
  render() {
    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{this.props.title}</title>
        <meta name="description" content={this.props.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/assets/bundle.css" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: this.props.body }} />
        <script src="/assets/bundle.js"></script>
      </body>
      </html>
    );
  }
}

Html.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string.isRequired
};

Html.defaultProps = {
  title: 'Boilerplate',
  description: 'OMFG. Another one boilerplate.'
};
