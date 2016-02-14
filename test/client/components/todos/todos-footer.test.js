import { expect } from 'chai';
import EVENTS from 'lib/events';
import Dispatcher from 'lib/dispatcher';
import ComponentMock from 'test/mocks/component';
import TodosFooterModel from 'client/components/todos/elems/footer/model';

let component = new ComponentMock();
let model;

describe('TodosFooter', () => {
  beforeEach(() => model = new TodosFooterModel(component));

  afterEach(() => model.destroy());

  describe('on "TodosUpdatedList" event', () => {
    it('should calculate the number of uncompleted todos', () => {
      Dispatcher.emit(EVENTS.TodosUpdatedList, {
        size: 4,
        completed: 1
      });

      expect(component.state.uncompleted).to.equal(3);
    });

    it('should detect if there are completed todos', () => {
      Dispatcher.emit(EVENTS.TodosUpdatedList, { completed: 1 });

      expect(component.state.hasCompleted).to.be.true;
    });

    it('should be hidden if there are no todos', () => {
      Dispatcher.emit(EVENTS.TodosUpdatedList, { size: 0 });

      expect(component.state.isHidden).to.be.true;
    });
  });

  describe('#clearCompleted()', () => {
    it('should emit the "TodosClearCompleted" event', done => {
      Dispatcher.once(EVENTS.TodosClearCompleted, () => done());

      model.clearCompleted();
    });
  });
});
