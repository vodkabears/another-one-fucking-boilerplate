import { expect } from 'chai';
import EVENTS from 'lib/events';
import Dispatcher from 'lib/dispatcher';
import ComponentMock from 'test/mocks/component';
import TodosHeaderModel from 'client/components/todos/elems/header/model';

let component = new ComponentMock();
let model;

describe('TodosHeader', () => {
  beforeEach(() => model = new TodosHeaderModel(component));

  afterEach(() => model.destroy());

  describe('on "TodosUpdatedList" event', () => {
    it('should have the checked checkbox, if all todos are completed', () => {
      Dispatcher.emit(EVENTS.TodosUpdatedList, {
        size: 5,
        completed: 5
      });

      expect(component.state.isCheckboxChecked).to.be.true;
    });

    it('should not have the checked checkbox, if there are no todos', () => {
      Dispatcher.emit(EVENTS.TodosUpdatedList, {
        size: 0,
        completed: 0
      });

      expect(component.state.isCheckboxChecked).to.be.false;
    });
  });

  describe('#createTodo(text)', () => {
    it('should emit the "TodosCreateItem" event', done => {
      Dispatcher.once(EVENTS.TodosCreateItem, data => {
        expect(data).to.be.deep.equal({ text: 'test' });

        done();
      });

      model.createTodo('test');
    });

    it('should uncheck the checkbox', () => {
      model.createTodo('test');

      expect(component.state.isCheckboxChecked).to.be.false;
    });

    it('should clear the input', () => {
      model.createTodo('test');

      expect(component.state.input).to.be.empty;
    });
  });

  describe('#syncInputText(text)', () => {
    it('should set text in the input', () => {
      model.syncInputText('test');

      expect(component.state.input).to.be.equal('test');
    });
  });

  describe('#toggleAll(makeCompleted)', () => {
    it('should toggle the checkbox', () => {
      component.state.isCheckboxChecked = false;
      model.toggleAll(true);

      expect(component.state.isCheckboxChecked).to.be.true;
    });
  });
});
