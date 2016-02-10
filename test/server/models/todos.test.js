import 'babel-polyfill';
import { expect } from 'chai';
import Model from 'server/models/todos';
import MongoDBMock from 'test/mocks/mongodb';

const COLLECTION = 'todos';
const SESSION_ID = 'fgZW2LlzuiLNNQvZFb6_XOofF2MjxfQU';

let mongodb = new MongoDBMock();

describe('Todos model', () => {
  afterEach(() => mongodb.argumentsStack.length = 0);

  describe('.get(request)', () => {
    it('should refer to the "todos" collection', () => {
      Model.get({ db: mongodb });

      expect(mongodb.argumentsStack[0][0]).to.be.equal(COLLECTION);
    });

    it('should find the collection by "sessionID"', () => {
      Model.get({ db: mongodb, sessionID: SESSION_ID });

      expect(mongodb.argumentsStack[1][0]._id).to.be.equal(SESSION_ID);
    });

    it('should return data', () => {
      let data = [{ items: [] }];

      mongodb.data = data;

      return Model.get({ db: mongodb })
        .then(items => expect(items).to.be.deep.equal(data[0].items));
    });

    it('should return an empty array if nothing is found', () => {
      let data = [];

      mongodb.data = data;

      return Model.get({ db: mongodb })
        .then(items => expect(items).to.be.deep.equal([]));
    });
  });

  describe('.add(request, item)', () => {
    it('should not make a request to DB if "text" is not defined', () => {
      Model.add({ db: mongodb });

      expect(mongodb.argumentsStack).to.be.empty;
    });

    it('should refer to the "todos" collection', () => {
      Model.add({ db: mongodb }, { text: 'test' });

      expect(mongodb.argumentsStack[0][0]).to.be.equal(COLLECTION);
    });

    it('should find the collection by "sessionID"', () => {
      Model.add({ db: mongodb, sessionID: SESSION_ID }, { text: 'test' });

      expect(mongodb.argumentsStack[1][0]._id).to.be.equal(SESSION_ID);
    });

    it('should generate an item ID', () => {
      Model.add({ db: mongodb }, { text: 'test' });

      expect(mongodb.argumentsStack[1][1].$push.items.id).to.be.a('string');
    });

    it('should trim text', () => {
      Model.add({ db: mongodb }, { text: '    test    ' });

      expect(mongodb.argumentsStack[1][1].$push.items.text).to.be.equal('test');
    });

    it('should pass the "isCompleted" property', () => {
      Model.add({ db: mongodb }, { text: 'test', isCompleted: true });

      expect(mongodb.argumentsStack[1][1].$push.items.isCompleted).to.be.true;
    });

    it('should return data', () => {
      let data = {
        value: { items: [] }
      };

      mongodb.data = data;

      return Model.add({ db: mongodb }, { text: 'test' })
        .then(items => expect(items).to.be.deep.equal(data.value.items));
    });

    it('should return an empty array if nothing is found', () => {
      let data = { value: null };

      mongodb.data = data;

      return Model.add({ db: mongodb }, { text: 'test' })
        .then(items => expect(items).to.be.deep.equal([]));
    });
  });

  describe('.edit(request, text, id)', () => {
    it('should not make a request to DB if "text" is not defined', () => {
      Model.edit({ db: mongodb });

      expect(mongodb.argumentsStack).to.be.empty;
    });

    it('should not make a request to DB if "id" is not defined', () => {
      Model.edit({ db: mongodb }, 'test');

      expect(mongodb.argumentsStack).to.be.empty;
    });

    it('should refer to the "todos" collection', () => {
      Model.edit({ db: mongodb }, 'test', '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[0][0]).to.be.equal(COLLECTION);
    });

    it('should find the collection by "sessionID"', () => {
      Model.edit({ db: mongodb, sessionID: SESSION_ID }, 'test', '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[1][0]._id).to.be.equal(SESSION_ID);
    });

    it('should pass an item ID', () => {
      let itemId = '56b8a6a8fd0b51ae4bf72887';

      Model.edit({ db: mongodb }, 'test', itemId);

      expect(mongodb.argumentsStack[1][0]['items.id']).to.be.equal(itemId);
    });

    it('should trim text', () => {
      Model.edit({ db: mongodb }, '   test   ', '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[1][1].$set['items.$.text']).to.be.equal('test');
    });

    it('should return data', () => {
      let data = {
        value: { items: [] }
      };

      mongodb.data = data;

      return Model.edit({ db: mongodb }, 'test', '56b8a6a8fd0b51ae4bf72887')
        .then(items => expect(items).to.be.deep.equal(data.value.items));
    });

    it('should return an empty array if nothing is found', () => {
      let data = { value: null };

      mongodb.data = data;

      return Model.edit({ db: mongodb }, 'test', '56b8a6a8fd0b51ae4bf72887')
        .then(items => expect(items).to.be.deep.equal([]));
    });
  });

  describe('.toggle(request, isCompleted, ids)', () => {
    it('should not make a request to DB if "isCompleted" is not defined', () => {
      Model.toggle({ db: mongodb });

      expect(mongodb.argumentsStack).to.be.empty;
    });

    it('should not make a request to DB if "ids" is not defined', () => {
      Model.toggle({ db: mongodb }, true);

      expect(mongodb.argumentsStack).to.be.empty;
    });

    it('should refer to the "todos" collection', () => {
      Model.toggle({ db: mongodb }, true, '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[0][0]).to.be.equal(COLLECTION);
    });

    it('should find the collection by "sessionID"', () => {
      Model.toggle({ db: mongodb, sessionID: SESSION_ID }, true, '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[1][0]._id).to.be.equal(SESSION_ID);
    });

    it('should toggle todos and save them', () => {
      mongodb.data = [{
        items: [
          {
            id: '56b8a6a8fd0b51ae4bf72887',
            text: 'test',
            isCompleted: false
          }
        ]
      }];

      return Model.toggle({ db: mongodb }, true, '56b8a6a8fd0b51ae4bf72887')
        .then(items => expect(items).to.be.deep.equal([{
          id: '56b8a6a8fd0b51ae4bf72887',
          text: 'test',
          isCompleted: true
        }]));
    });

    it('should build the right update query', () => {
      let itemId = '56b8a6a8fd0b51ae4bf72887';
      let argumentsStack = mongodb.argumentsStack;

      mongodb.data = [{
        items: [
          {
            id: itemId,
            text: 'test',
            isCompleted: false
          }
        ]
      }];

      return Model.toggle({ db: mongodb, sessionID: SESSION_ID }, true, itemId)
        .then(() => expect(argumentsStack[argumentsStack.length - 1][0]).to.be.deep.equal({
          _id: SESSION_ID,
          'items.id': itemId
        }));
    });

    it('should build the right update document', () => {
      let itemId = '56b8a6a8fd0b51ae4bf72887';
      let argumentsStack = mongodb.argumentsStack;

      mongodb.data = [{
        items: [
          {
            id: itemId,
            text: 'test',
            isCompleted: false
          }
        ]
      }];

      return Model.toggle({ db: mongodb }, true, itemId)
        .then(() => expect(argumentsStack[argumentsStack.length - 1][1]).to.be.deep.equal({
          $set: { 'items.$.isCompleted': true }
        }));
    });

    it('should return an empty array if nothing is found', () => {
      mongodb.data = [];

      return Model.toggle({ db: mongodb }, true, '56b8a6a8fd0b51ae4bf72887')
        .then(items => expect(items).to.be.deep.equal([]));
    });
  });

  describe('.remove(request, ids)', () => {
    it('should not make a request to DB if "ids" are empty or undefined', () => {
      Model.remove({ db: mongodb }, []);

      expect(mongodb.argumentsStack).to.be.empty;
    });

    it('should refer to the "todos" collection', () => {
      Model.remove({ db: mongodb }, '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[0][0]).to.be.equal(COLLECTION);
    });

    it('should find the collection by "sessionID"', () => {
      Model.remove({ db: mongodb, sessionID: SESSION_ID }, '56b8a6a8fd0b51ae4bf72887');

      expect(mongodb.argumentsStack[1][0]._id).to.be.equal(SESSION_ID);
    });

    it('should build the right update document', () => {
      let ids = [
        '56b8a6a8fd0b51ae4bf72887',
        '56b8a6a9fd0b51ae4bf72888'
      ];

      Model.remove({ db: mongodb }, ids);

      expect(mongodb.argumentsStack[1][1]).to.be.deep.equal({
        $pull: { items: { id: { $in: ids } } }
      });
    });

    it('should return data', () => {
      let data = {
        value: { items: [] }
      };

      mongodb.data = data;

      return Model.remove({ db: mongodb }, '56b8a6a8fd0b51ae4bf72887')
        .then(items => expect(items).to.be.deep.equal(data.value.items));
    });

    it('should return an empty array if nothing is found', () => {
      let data = { value: null };

      mongodb.data = data;

      return Model.remove({ db: mongodb }, '56b8a6a8fd0b51ae4bf72887')
        .then(items => expect(items).to.be.deep.equal([]));
    });
  });
});
