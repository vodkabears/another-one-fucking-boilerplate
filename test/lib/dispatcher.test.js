import { EventEmitter } from 'events';
import { expect } from 'chai';
import sinon from 'sinon';
import Dispatcher from 'lib/dispatcher';

let EVENT = 'event';
let spy;

describe('Dispatcher', () => {
  afterEach(() => Dispatcher.off(EVENT, spy));

  describe('.emit(event, data)', () => {
    it('should emit an event', () => {
      spy = sinon.spy(EventEmitter.prototype, 'emit');

      Dispatcher.emit(EVENT, 'data');

      expect(spy.calledWithExactly(EVENT, 'data')).to.be.true;
    });
  });

  describe('.on(event, listener)', () => {
    it('should handle multiple events', () => {
      spy = sinon.spy();

      Dispatcher.on(EVENT, spy);
      Dispatcher.emit(EVENT);
      Dispatcher.emit(EVENT);

      expect(spy.callCount).to.be.equal(2);
    });

    it('should pass data to the handler', () => {
      spy = sinon.spy();

      Dispatcher.on(EVENT, spy).emit(EVENT, 'data');

      expect(spy.calledWithExactly('data')).to.be.true;
    });
  });

  describe('.once(event, listener)', () => {
    it('should handle an event once', () => {
      spy = sinon.spy();

      Dispatcher.once(EVENT, spy);
      Dispatcher.emit(EVENT);
      Dispatcher.emit(EVENT);

      expect(spy.callCount).to.be.equal(1);
    });

    it('should pass data to the handler', () => {
      spy = sinon.spy();

      Dispatcher.once(EVENT, spy).emit(EVENT, 'data');

      expect(spy.calledWithExactly('data')).to.be.true;
    });
  });

  describe('.off(event, listener)', () => {
    it('should remove an event listener', () => {
      spy = sinon.spy();

      Dispatcher.on(EVENT, spy).off(EVENT, spy).emit(EVENT);

      expect(spy.called).to.be.false;
    });
  });
});
