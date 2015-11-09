import Component, { PropTypes } from 'lib/component';

export default class HtmlGoogleAnalytics extends Component {
  /**
   * @override
   */
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

/**
 * @static
 * @type {Object}
 */
HtmlGoogleAnalytics.propTypes = {
  id: PropTypes.string.isRequired
};
