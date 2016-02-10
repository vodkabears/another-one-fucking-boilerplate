import { expect } from 'chai';
import sinon from 'sinon';
import Todos from 'server/models/todos';
import provider from 'server/providers/page-type-todos-example';

let sandbox = sinon.sandbox.create();

describe('PageTypeTodosExample provider', () => {
  afterEach(() => sandbox.restore());

  it('should return correct data', () => {
    sandbox.stub(Todos, 'get', () => Promise.resolve([]));

    return provider()
      .then(data => expect(data.PageTypeTodosExample).to.be.deep.equal({
        Todos: { items: [] },
        SEO: {
          title: 'Boilerplate • TodoMVC',
          description: 'Todo apps with Boilerplate'
        }
      }));
  });
});
