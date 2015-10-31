import React, { PropTypes } from 'react';

export default class GoogleAnalyticsElem extends React.Component {
  render() {
    return (
      <div>
        <script dangerouslySetInnerHTML={{ __html:
          '(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=' +
          'function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;' +
          'e=o.createElement(i);r=o.getElementsByTagName(i)[0];' +
          'e.src="https://www.google-analytics.com/analytics.js";' +
          'r.parentNode.insertBefore(e,r)}(window,document,"script","ga"));' +
          `ga("create","${this.props.id}","auto");ga("send","pageview");`
        }} />
      </div>
    );
  }
}

GoogleAnalyticsElem.propTypes = {
  id: PropTypes.string.isRequired
};
