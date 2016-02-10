import { expect } from 'chai';
import provider from 'server/providers/page-type-welcome';

describe('PageTypeWelcome provider', () => {
  it('should return correct data', () => {
    return provider()
      .then(data => expect(data.PageTypeWelcome).to.be.deep.equal({
        SEO: {
          title: 'Boilerplate',
          description: 'Next-gen boilerplate with trendy front-end technologies'
        }
      }));
  });
});
