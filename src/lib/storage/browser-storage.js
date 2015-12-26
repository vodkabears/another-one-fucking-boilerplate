import uuid from 'node-uuid';
import Storage from './storage';

export default class BrowserStorage extends Storage {
  /**
   * @override
   */
  constructor(name, initialData) {
    super('storage:' + name, initialData);
  }

  /**
   * @param {Object} [query]
   * @returns {Promise}
   */
  sync(query) {
    return new Promise((resolve, reject) => {
      if (!localStorage) {
        return reject(new Error(BrowserStorage.ERRORS.UNSUPPORTED));
      }

      let name = this._name;
      let data;

      try {
        data = JSON.parse(localStorage.getItem(name));
      } catch (e) {
        data = null;
      }

      if (!data || !Array.isArray(data.items)) {
        data = { items: [] };
      }

      let actualItems = data.items;
      let queryParams = query && Object.keys(query);

      data.items = queryParams && queryParams.length ?
        actualItems.filter(item => {
          return queryParams.every(param => item[param] === query[param]);
        }) : actualItems;

      this._cache = data;

      resolve(data);
    });
  }

  /**
   * @param {Object|Object[]} items
   * @returns {Promise}
   */
  add(items) {
    return new Promise((resolve, reject) => {
      let cache = this._cache;

      if (!cache) {
        return reject(new Error(BrowserStorage.ERRORS.NOT_SYNCED));
      }

      Array.isArray(items) || (items = [items]);
      items = items.map(item => Object.assign({ id: uuid.v1() }, item));

      let name = this._name;
      let data;

      try {
        data = JSON.parse(localStorage.getItem(name));
      } catch (e) {
        data = null;
      }

      if (!data || !Array.isArray(data.items)) {
        data = { items: [] };
      }

      data.items.push(...items);
      cache.items.push(...items);
      localStorage.setItem(name, JSON.stringify(data));

      resolve(cache);
    });
  }

  /**
   * @param {Object} update
   * @param {Object} [query]
   * @returns {Promise}
   */
  update(update, query) {
    return new Promise((resolve, reject) => {
      let cache = this._cache;

      if (!cache) {
        return reject(new Error(BrowserStorage.ERRORS.NOT_SYNCED));
      }

      let cachedItems = cache.items;
      let idsToUpdate = query ?
        this.getIdsByQuery(query) :
        cachedItems.map(item => item.id);

      if (idsToUpdate.length) {
        let name = this._name;
        let updateParams = Object.keys(update);
        let updateCollection = function(item) {
          if (idsToUpdate.includes(item.id)) {
            let hasOwnProperty = Object.hasOwnProperty.bind(item);

            updateParams.forEach(paramToUpdate => {
              if (hasOwnProperty(paramToUpdate)) {
                item[paramToUpdate] = update[paramToUpdate];
              }
            });
          }
        };
        let data;

        try {
          data = JSON.parse(localStorage.getItem(name));
        } catch (e) {
          data = null;
        }

        let actualItems = data && data.items;

        if (Array.isArray(actualItems)) {
          actualItems.forEach(updateCollection);
          localStorage.setItem(name, JSON.stringify(data));
        }

        cachedItems.forEach(updateCollection);
      }

      resolve(cache);
    });
  }

  /**
   * @param {Object} [query]
   * @returns {Promise}
   */
  remove(query) {
    return new Promise((resolve, reject) => {
      let cache = this._cache;

      if (!cache) {
        return reject(new Error(BrowserStorage.ERRORS.NOT_SYNCED));
      }

      let name = this._name;
      let data;

      try {
        data = JSON.parse(localStorage.getItem(name));
      } catch (e) {
        data = null;
      }

      let actualItems = data && data.items;

      if (query) {
        let cachedItems = cache.items;
        let idsToRemove = this.getIdsByQuery(query);

        if (idsToRemove.length) {
          if (Array.isArray(actualItems)) {
            data.items = actualItems.filter(item => !idsToRemove.includes(item.id));
            localStorage.setItem(name, JSON.stringify(data));
          }

          cache.items = cachedItems.filter(item => !idsToRemove.includes(item.id));
        }
      } else {
        if (Array.isArray(actualItems)) {
          data.items = [];
          localStorage.setItem(name, JSON.stringify(data));
        }

        cache.items = [];
      }

      resolve(cache);
    });
  }
}

/**
 * @static
 * @type {Object}
 */
BrowserStorage.ERRORS = Object.assign({
  UNSUPPORTED: 'Browser storage is not supported'
}, Storage.ERRORS);
