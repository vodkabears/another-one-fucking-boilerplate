import EventsList from 'lib/events-list';

/**
 * Available events
 * @type {Object}
 */
export default (() => {
  return EventsList.reduce((ret, eventName) => {
    ret[eventName] = eventName;

    return ret;
  }, {});
})();
