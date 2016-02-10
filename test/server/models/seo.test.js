import { expect } from 'chai';
import Model from 'server/models/seo';

describe('SEO model', () => {
  describe('.get(pageName)', () => {
    it('should return correct data if "pageName" is "PageTypeWelcome"', () => {
      expect(Model.get('PageTypeWelcome')).to.be.deep.equal({
        title: 'Boilerplate',
        description: 'Next-gen boilerplate with trendy front-end technologies'
      });
    });

    it('should return correct data if "pageName" is "PageTypeTodosExample"', () => {
      expect(Model.get('PageTypeTodosExample')).to.be.deep.equal({
        title: 'Boilerplate • TodoMVC',
        description: 'Todo apps with Boilerplate'
      });
    });
  });
});
