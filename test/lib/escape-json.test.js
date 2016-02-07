import { expect } from 'chai';
import escapeJSON from 'lib/escape-json';

describe('escapeJSON(json)', () => {
  it('should escape unsafe characters in JSON', () => {
    let json = JSON.stringify({ xss: '\'&"/><script>alert(/xss/)</script>' });

    expect(escapeJSON(json))
      .to.be.equal('{"xss":"&quot;&amp;&quot;&#x2F;&gt;&lt;script&gt;alert(&#x2F;xss&#x2F;)&lt;&#x2F;script&gt;"}');
  });
});
