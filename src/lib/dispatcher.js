import { EventEmitter } from 'events';
import EventsList from 'lib/events-list';

/**
 * Creates events hash
 * @param {Array} eventList
 * @returns {Object}
 */
function createEventsHash(eventList) {
  return eventList.reduce((ret, eventName) => {
    ret[eventName] = eventName;

    return ret;
  }, {});
}

const EVENTS = createEventsHash(EventsList);

let dispatcher = new EventEmitter();

dispatcher.setMaxListeners(Infinity);

export { dispatcher as Dispatcher, EVENTS };
