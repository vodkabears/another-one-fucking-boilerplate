import { expect } from 'chai';
import EVENTS from 'lib/events';
import Dispatcher from 'lib/dispatcher';
import ComponentMock from 'test/mocks/component';
import TodosItemModel from 'client/components/todos/elems/item/model';

let component = new ComponentMock({ id: 1, text: 'test' });
let model = new TodosItemModel(component);

describe('TodosItem', () => {
  describe('#toggle(makeCompleted)', () => {
    it('should emit the "TodosToggleItem" event', done => {
      Dispatcher.once(EVENTS.TodosToggleItem, data => {
        expect(data).to.be.deep.equal({
          makeCompleted: true,
          id: 1
        });

        done();
      });

      model.toggle(true);
    });
  });

  describe('#remove()', () => {
    it('should emit the "TodosDeleteItem" event', done => {
      Dispatcher.once(EVENTS.TodosDeleteItem, data => {
        expect(data).to.be.deep.equal({ id: 1 });

        done();
      });

      model.remove();
    });
  });

  describe('#startEditing()', () => {
    it('should enable the edit mode', () => {
      component.state.isEditing = false;
      model.startEditing();

      expect(component.state.isEditing).to.be.true;
    });

    it('should set text in the input', () => {
      model.startEditing();

      expect(component.state.input).to.be.equal('test');
    });
  });

  describe('#cancelEditing()', () => {
    it('should disable the edit mode', () => {
      component.state.isEditing = true;
      model.cancelEditing();

      expect(component.state.isEditing).to.be.false;
    });
  });

  describe('#saveChanges()', () => {
    it('should emit the "TodosUpdateItem" event', done => {
      Dispatcher.once(EVENTS.TodosUpdateItem, data => {
        expect(data).to.be.deep.equal({
          text: 'test',
          id: 1
        });

        done();
      });

      model.saveChanges();
    });

    it('should disable the edit mode', () => {
      component.state.isEditing = true;
      model.saveChanges();

      expect(component.state.isEditing).to.be.false;
    });
  });

  describe('#syncInputText(text)', () => {
    it('should set text in the input', () => {
      model.syncInputText('test');

      expect(component.state.input).to.be.equal('test');
    });
  });
});
