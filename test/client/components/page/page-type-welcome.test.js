import { expect } from 'chai';
import sinon from 'sinon';
import API from 'lib/api';
import ComponentMock from 'test/mocks/component';
import PageTypeWelcomeModel from 'client/components/page/mods/type/welcome/model';

let component = new ComponentMock();
let model = new PageTypeWelcomeModel(component);
let sandbox = sinon.sandbox.create();

describe('PageTypeWelcome', () => {
  afterEach(() => sandbox.restore());

  describe('#load()', () => {
    it('should set correct state after loading', () => {
      let data = {
        SEO: {
          title: 'Boilerplate',
          description: 'Next-gen boilerplate with trendy front-end technologies'
        }
      };

      sandbox.stub(API, 'get').returns(Promise.resolve(data));

      return model.load()
        .then(() => expect(component.state).to.deep.equal(Object.assign({ isLoading: false }, data)));
    });
  });
});
