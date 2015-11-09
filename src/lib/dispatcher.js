import { EventEmitter } from 'events';
import EventsList from 'lib/events-list';

let emitter = new EventEmitter();

emitter.setMaxListeners(Infinity);

export default class Dispatcher {
  /**
   * Triggers an event
   * @param {String} event
   * @param {Object} data
   * @returns {Boolean} Returns true if event had listeners, false otherwise
   */
  static emit(event, data) {
    return emitter.emit(event, data);
  }

  /**
   * Adds a listener for the event
   * @param {String} event
   * @param {Function} listener
   * @returns {Dispatcher}
   */
  static on(event, listener) {
    emitter.on(event, listener);

    return Dispatcher;
  }

  /**
   * Adds a one time listener for the event
   * @param {String} event
   * @param {Function} listener
   * @returns {Dispatcher}
   */
  static once(event, listener) {
    emitter.once(event, listener);

    return Dispatcher;
  }

  /**
   * Removes a listener of the event
   * @param {String} event
   * @param {Function} listener
   * @returns {Dispatcher}
   */
  static off(event, listener) {
    emitter.removeListener(event, listener);

    return Dispatcher;
  }
}

/**
 * Available events
 * @type {Object}
 */
export const EVENTS = (() => {
  return EventsList.reduce((ret, eventName) => {
    ret[eventName] = eventName;

    return ret;
  }, {});
})();
