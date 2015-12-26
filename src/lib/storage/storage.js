export default class Storage {
  /**
   * @param {String} name
   * @param {Object} data
   */
  constructor(name, initialData) {
    /**
     * Name of the storage
     * @protected
     * @type {String}
     */
    this._name = name;

    /**
     * Cached data of the storage
     * @protected
     * @type {Object}
     */
    this._cache = initialData;
  }

  /**
   * Returns ids from cached data by query
   * @protected
   * @param {Object} query
   * @returns {String[]} Ids
   */
  getIdsByQuery(query) {
    let cache = this._cache;
    let cachedItems = cache && cache.items;

    return query && cachedItems ? cachedItems.reduce((ids, item) => {
      if (!query || Object.keys(query).every(param => item[param] === query[param])) {
        ids.push(item.id);
      }

      return ids;
    }, []) : [];
  }

  /**
   * Returns data from the storage
   * @abstract
   * @return {Promise}
   */
  sync() {}

  /**
   * Saves items to the storage
   * @abstract
   * @return {Promise}
   */
  add() {}

  /**
   * Update items of the storage
   * @abstract
   * @return {Promise}
   */
  update() {}

  /**
   * Removes items from the storage
   * @abstract
   * @return {Promise}
   */
  remove() {}
}

/**
 * @static
 * @type {Object}
 */
Storage.ERRORS = {
  GETTING_DATA: 'Error getting data of the storage',
  NOT_SYNCED: 'Storage is not synced'
};
