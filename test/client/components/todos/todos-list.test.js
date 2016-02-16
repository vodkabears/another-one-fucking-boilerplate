import { expect } from 'chai';
import sinon from 'sinon';
import API from 'lib/api';
import EVENTS from 'lib/events';
import Dispatcher from 'lib/dispatcher';
import ComponentMock from 'test/mocks/component';
import TodosListModel from 'client/components/todos/elems/list/model';

let component = new ComponentMock();
let sandbox = sinon.sandbox.create();
let model;

describe('TodosList', () => {
  beforeEach(() => {
    component.state = { todos: [] };
    model = new TodosListModel(component);
  });

  afterEach(() => {
    model.destroy();
    sandbox.restore();
  });

  it('should call #addTodo(text) on the "TodosCreateItem" event', () => {
    let spy = sandbox.spy(model, 'addTodo');

    sandbox.stub(API, 'create', () => Promise.resolve());
    Dispatcher.emit(EVENTS.TodosCreateItem, { text: 'test' });

    expect(spy.calledWithExactly('test')).to.be.true;
  });

  it('should call #updateTodo(id, text) on the "TodosUpdateItem" event', () => {
    let spy = sandbox.spy(model, 'updateTodo');

    sandbox.stub(API, 'update', () => Promise.resolve());
    Dispatcher.emit(EVENTS.TodosUpdateItem, { id: 42, text: 'life' });

    expect(spy.calledWithExactly(42, 'life')).to.be.true;
  });

  it('should call #toggleTodo(id, text) on the "TodosToggleItem" event', () => {
    let spy = sandbox.spy(model, 'toggleTodo');

    sandbox.stub(API, 'update', () => Promise.resolve());
    Dispatcher.emit(EVENTS.TodosToggleItem, { id: 42, makeCompleted: false });

    expect(spy.calledWithExactly(42, false)).to.be.true;
  });

  it('should call #toggleAll() on the "TodosToggleAll" event', () => {
    let spy = sandbox.spy(model, 'toggleAll');

    sandbox.stub(API, 'update', () => Promise.resolve());
    Dispatcher.emit(EVENTS.TodosToggleAll, { makeCompleted: true });

    expect(spy.calledWithExactly(true)).to.be.true;
  });

  it('should call #deleteTodo(id) on the "TodosDeleteItem" event', () => {
    let spy = sandbox.spy(model, 'deleteTodo');

    sandbox.stub(API, 'remove', () => Promise.resolve());
    Dispatcher.emit(EVENTS.TodosDeleteItem, { id: 42 });

    expect(spy.calledWithExactly(42)).to.be.true;
  });

  it('should call #deleteCompleted() on the "TodosClearCompleted" event', () => {
    let spy = sandbox.spy(model, 'deleteCompleted');

    sandbox.stub(API, 'remove', () => Promise.resolve());
    Dispatcher.emit(EVENTS.TodosClearCompleted);

    expect(spy.calledWithExactly()).to.be.true;
  });

  describe('#inform()', () => {
    it('should emit the "TodosUpdatedList" event', done => {
      Dispatcher.once(EVENTS.TodosUpdatedList, () => done());

      model.inform();
    });

    it('should not emit the "TodosUpdatedList" event if todos are undefined', done => {
      let isEmitted = false;

      component.state = {};
      Dispatcher.once(EVENTS.TodosUpdatedList, () => isEmitted = true);
      model.inform();

      setTimeout(() => {
        expect(isEmitted).to.be.false;

        done();
      }, 0);
    });

    it('should correctly calculate the number of completed todos', done => {
      component.state.todos.push({
        id: 1,
        text: 'test',
        isCompleted: true
      });

      Dispatcher.once(EVENTS.TodosUpdatedList, data => {
        expect(data.completed).to.be.equal(1);

        done();
      });

      model.inform();
    });

    it('should correctly calculate the number todos', done => {
      Dispatcher.once(EVENTS.TodosUpdatedList, data => {
        expect(data.size).to.be.equal(0);

        done();
      });

      model.inform();
    });
  });

  describe('#addTodo(text)', () => {
    it('should not add a new todo if text is undefined', () => {
      let spy = sandbox.spy(API, 'create');

      model.addTodo();

      expect(spy.called).to.be.false;
    });

    it('should call the "/api/components/Todos" gate', () => {
      sandbox.stub(API, 'create', gate => {
        expect(gate).to.be.equal('/api/components/Todos');

        return Promise.resolve({});
      });

      return model.addTodo('test');
    });

    it('should correctly add a new todo', () => {
      sandbox.stub(API, 'create', (gate, params) => Promise.resolve({
        items: [{
          id: 1,
          text: params.text,
          isCompleted: params.isCompleted
        }]
      }));

      return model.addTodo('test').then(() => {
        expect(component.state.todos).to.be.deep.equal([{
          id: 1,
          text: 'test',
          isCompleted: false
        }]);
      });
    });
  });

  describe('#updateTodo(id, text)', () => {
    it('should not update a todo if text is undefined', () => {
      let spy = sandbox.spy(API, 'update');

      model.updateTodo();

      expect(spy.called).to.be.false;
    });

    it('should call the "/api/components/Todos/edit" gate', () => {
      sandbox.stub(API, 'update', gate => {
        expect(gate).to.be.equal('/api/components/Todos/edit');

        return Promise.resolve({});
      });

      return model.updateTodo(1, 'test');
    });

    it('should correctly update a todo', () => {
      sandbox.stub(API, 'update', (gate, params, query) => Promise.resolve({
        items: [{
          id: query.id,
          text: params.text,
          isCompleted: false
        }]
      }));

      return model.updateTodo(1, 'test').then(() => {
        expect(component.state.todos).to.be.deep.equal([{
          id: 1,
          text: 'test',
          isCompleted: false
        }]);
      });
    });
  });

  describe('#deleteTodo(id)', () => {
    it('should call the "/api/components/Todos" gate', () => {
      sandbox.stub(API, 'remove', gate => {
        expect(gate).to.be.equal('/api/components/Todos');

        return Promise.resolve({});
      });

      return model.deleteTodo(1);
    });

    it('should correctly remove a todo', () => {
      sandbox.stub(API, 'remove', (gate, query) => {
        expect(query.id).to.be.equal(1);

        return Promise.resolve({});
      });

      return model.deleteTodo(1);
    });
  });

  describe('#deleteTodo(id)', () => {
    it('should call the "/api/components/Todos" gate', () => {
      sandbox.stub(API, 'remove', gate => {
        expect(gate).to.be.equal('/api/components/Todos');

        return Promise.resolve({});
      });

      return model.deleteTodo(1);
    });

    it('should correctly remove a todo', () => {
      sandbox.stub(API, 'remove', (gate, query) => {
        expect(query.id).to.be.equal(1);

        return Promise.resolve({});
      });

      return model.deleteTodo(1);
    });
  });

  describe('#deleteCompleted()', () => {
    it('should not toggle todos if todos are undefined', () => {
      let spy = sandbox.spy(API, 'remove');

      component.state = {};
      model.deleteCompleted();

      expect(spy.called).to.be.false;
    });

    it('should call the "/api/components/Todos" gate', () => {
      sandbox.stub(API, 'remove', gate => {
        expect(gate).to.be.equal('/api/components/Todos');

        return Promise.resolve({});
      });

      return model.deleteCompleted();
    });

    it('should remove completed todos', () => {
      component.state.todos = [
        {
          id: 1,
          text: 'test',
          isCompleted: true
        },
        {
          id: 2,
          text: 'test',
          isCompleted: true
        },
        {
          id: 3,
          text: 'test',
          isCompleted: false
        }
      ];

      sandbox.stub(API, 'remove', (gate, query) => {
        expect(query.id).to.be.deep.equal([1, 2]);

        return Promise.resolve({});
      });

      return model.deleteCompleted();
    });
  });

  describe('#toggleTodo(id, isCompleted)', () => {
    it('should call the "/api/components/Todos/toggle" gate', () => {
      sandbox.stub(API, 'update', gate => {
        expect(gate).to.be.equal('/api/components/Todos/toggle');

        return Promise.resolve({});
      });

      return model.toggleTodo(1, true);
    });

    it('should correctly toggle a todo', () => {
      sandbox.stub(API, 'update', (gate, params, query) => Promise.resolve({
        items: [{
          id: query.id,
          text: 'test',
          isCompleted: params.isCompleted
        }]
      }));

      return model.toggleTodo(1, true).then(() => {
        expect(component.state.todos).to.be.deep.equal([{
          id: 1,
          text: 'test',
          isCompleted: true
        }]);
      });
    });
  });

  describe('#toggleAll(isCompleted)', () => {
    it('should not toggle todos if todos are undefined', () => {
      let spy = sandbox.spy(API, 'update');

      component.state = {};
      model.toggleAll(true);

      expect(spy.called).to.be.false;
    });

    it('should call the "/api/components/Todos/toggle" gate', () => {
      sandbox.stub(API, 'update', gate => {
        expect(gate).to.be.equal('/api/components/Todos/toggle');

        return Promise.resolve({});
      });

      return model.toggleTodo(1, true);
    });

    it('should toggle all todos', () => {
      component.state.todos = [
        {
          id: 1,
          text: 'test',
          isCompleted: true
        },
        {
          id: 2,
          text: 'test',
          isCompleted: false
        }
      ];

      sandbox.stub(API, 'update', (gate, params, query) => {
        expect(query.id).to.be.deep.equal([1, 2]);

        return Promise.resolve({});
      });

      return model.toggleAll(true);
    });

    it('should send correct params', () => {
      sandbox.stub(API, 'update', (gate, params) => {
        expect(params.isCompleted).to.be.true;

        return Promise.resolve({});
      });

      return model.toggleAll(true);
    });
  });
});
