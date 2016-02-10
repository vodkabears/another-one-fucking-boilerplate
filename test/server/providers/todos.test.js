import { expect } from 'chai';
import sinon from 'sinon';
import Todos from 'server/models/todos';
import provider from 'server/providers/todos';

let sandbox = sinon.sandbox.create();

describe('Todos provider', () => {
  afterEach(() => sandbox.restore());

  it('should return correct data', () => {
    sandbox.stub(Todos, 'get', () => Promise.resolve([]));

    return provider()
      .then(data => expect(data.Todos).to.be.deep.equal({ items: [] }));
  });
});
