import { EventEmitter } from 'events';
import { expect } from 'chai';
import sinon from 'sinon';
import Dispatcher from 'lib/dispatcher';

let sandbox = sinon.sandbox.create();

describe('Dispatcher', () => {
  afterEach(() => sandbox.restore());

  describe('.emit(event, data)', () => {
    it('should emit an event', () => {
      let spy = sandbox.spy(EventEmitter.prototype, 'emit');

      Dispatcher.emit('event', 'data');

      expect(spy.calledWithExactly('event', 'data')).to.be.true;
    });
  });

  describe('.on(event, listener)', () => {
    it('should handle multiple events', () => {
      let spy = sandbox.spy();

      Dispatcher.on('event', spy);
      Dispatcher.emit('event');
      Dispatcher.emit('event');

      expect(spy.callCount).to.be.equal(2);
    });

    it('should pass data to the handler', () => {
      let spy = sandbox.spy();

      Dispatcher.on('event', spy).emit('event', 'data');

      expect(spy.calledWithExactly('data')).to.be.true;
    });
  });

  describe('.once(event, listener)', () => {
    it('should handle an event once', () => {
      let spy = sandbox.spy();

      Dispatcher.once('event', spy);
      Dispatcher.emit('event');
      Dispatcher.emit('event');

      expect(spy.callCount).to.be.equal(1);
    });

    it('should pass data to the handler', () => {
      let spy = sandbox.spy();

      Dispatcher.once('event', spy).emit('event', 'data');

      expect(spy.calledWithExactly('data')).to.be.true;
    });
  });

  describe('.off(event, listener)', () => {
    it('should remove an event listener', () => {
      let spy = sandbox.spy();

      Dispatcher.on('event', spy).off('event', spy).emit('event');

      expect(spy.called).to.be.false;
    });
  });
});
