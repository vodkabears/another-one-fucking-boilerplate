import Component, { PropTypes } from 'lib/component';

export default class HtmlYandexMetrica extends Component {
  /**
   * @override
   */
  render() {
    let id = this.props.id;

    return (
      <div>
        <script dangerouslySetInnerHTML={{ __html:
          '(function(d,w,c){(w[c]=w[c]||[]).push(function(){' +
          `try{w.yaCounter${id}=new Ya.Metrika(` +
          `{id:${id},clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true}` +
          ');}catch(e){}});' +
          'var n=d.getElementsByTagName("script")[0],' +
          's=d.createElement("script"),' +
          'f=function(){n.parentNode.insertBefore(s,n);};' +
          's.type="text/javascript";' +
          's.async=true;' +
          's.src="https://mc.yandex.ru/metrika/watch.js";' +
          'if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",f,false);}else{f();}' +
          '})(document,window,"yandex_metrika_callbacks");'
        }} />
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${id}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
      </div>
    );
  }
}

/**
 * @static
 * @type {Object}
 */
HtmlYandexMetrica.propTypes = {
  id: PropTypes.string.isRequired
};
