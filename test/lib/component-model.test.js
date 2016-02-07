import { expect } from 'chai';
import sinon from 'sinon';
import Dispatcher from 'lib/dispatcher';
import ComponentModel from 'lib/component-model';
import ComponentMock from 'test/mocks/component';

let component = new ComponentMock();
let model = new ComponentModel(component);
let sandbox = sinon.sandbox.create();

describe('ComponentModel', () => {
  afterEach(() => sandbox.restore());

  beforeEach(() => {
    component.props = { text: 'props' };
    component.state = { text: 'state' };
  });

  describe('#props', () => {
    it('should return component props', () => {
      expect(model.props).to.be.deep.equal(component.props);
    });
  });

  describe('#state', () => {
    it('should return component state', () => {
      expect(model.state).to.be.deep.equal(component.state);
    });
  });

  describe('#setState(state)', () => {
    it('should change component state', () => {
      let nextState = { text: 'test', number: 1 };

      model.setState(nextState);

      expect(component.state).to.be.deep.equal(nextState);
    });
  });

  describe('#bindToThis(fn)', () => {
    it('should change a function context', () => {
      let fn = function() {
        expect(this).to.be.equal(model);
      };

      model.bindToThis(fn)();
    });

    it('should not create several bindings for the same function', () => {
      let fn = function() {
        expect(this).to.be.equal(model);
      };

      expect(model.bindToThis(fn)).to.be.equal(model.bindToThis(fn));
    });
  });

  describe('#emit(event, data)', () => {
    it('should emit an event', done => {
      Dispatcher.once('event', () => done());

      model.emit('event');
    });

    it('should pass data to the handler', done => {
      Dispatcher.once('event', data => {
        expect(data).to.be.equal('data');

        done();
      });

      model.emit('event', 'data');
    });
  });

  describe('#on(event, listener)', () => {
    it('should handle multiple events', () => {
      let spy = sandbox.spy();

      model.on('event', spy);
      model.emit('event');
      model.emit('event');

      expect(spy.callCount).to.be.equal(2);
    });

    it('should pass data to the handler', () => {
      let spy = sandbox.spy();

      model.on('event', spy).emit('event', 'data');

      expect(spy.calledWithExactly('data')).to.be.true;
    });

    it('should call the handler with the model context', () => {
      let spy = sandbox.spy();

      model.on('event', spy).emit('event');

      expect(spy.calledOn(model)).to.be.true;
    });
  });

  describe('#once(event, listener)', () => {
    it('should handle an event once', () => {
      let spy = sandbox.spy();

      model.once('event', spy);
      model.emit('event');
      model.emit('event');

      expect(spy.callCount).to.be.equal(1);
    });

    it('should pass data to the handler', () => {
      let spy = sandbox.spy();

      model.once('event', spy).emit('event', 'data');

      expect(spy.calledWithExactly('data')).to.be.true;
    });

    it('should call the handler with the model context', () => {
      let spy = sandbox.spy();

      model.once('event', spy).emit('event');

      expect(spy.calledOn(model)).to.be.true;
    });
  });

  describe('#off(event, listener)', () => {
    it('should remove an event listener', () => {
      let spy = sandbox.spy();

      model.on('event', spy).off('event', spy).emit('event');

      expect(spy.called).to.be.false;
    });
  });

  describe('#destroy()', () => {
    it('should remove all event listeners of the model', () => {
      let spy = sandbox.spy();

      model.on('event1', spy).on('event2', spy).destroy();
      model.emit('event1');
      model.emit('event2');

      expect(spy.called).to.be.false;
    });
  });
});
