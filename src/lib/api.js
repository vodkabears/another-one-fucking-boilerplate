export default class API {
  /**
   * Returns a query string
   * @param {String} path
   * @param {Object} [query]
   * @returns {String}
   */
  static getQueryString(path, query) {
    return query ? path + Object.keys(query).reduce((qs, key, index) => {
      let param = query[key];

      qs += index === 0 ? '?' : '&';

      if (Array.isArray(param)) {
        qs += param.reduce((ret, value, paramIndex) => {
          return ret + (paramIndex === 0 ? '' : '&') + encodeURIComponent(key) + '=' + encodeURIComponent(value);
        }, '');
      } else {
        qs += encodeURIComponent(key) + '=' + encodeURIComponent(param);
      }

      return qs;
    }, '') : path;
  }

  /**
   * Returns data
   * @param {String} path
   * @param {Object} query
   * @returns {Promise}
   */
  static get(path, query) {
    return fetch(API.getQueryString(path, query))
      .then(response => response.json());
  }

  /**
   * Adds data
   * @param {String} path
   * @param {FormData|Object} data
   * @returns {Promise}
   */
  static add(path, data) {
    let body;
    let headers;

    if (!(data instanceof FormData)) {
      body = JSON.stringify(data);
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
    } else {
      body = data;
    }

    return fetch(path, {
      body,
      headers,
      method: 'post'
    }).then(response => response.json());
  }

  /**
   * Updates data
   * @param {String} path
   * @param {FormData|Object} update
   * @param {Object} query
   * @returns {Promise}
   */
  static update(path, update, query) {
    let body;
    let headers;

    if (!(update instanceof FormData)) {
      body = JSON.stringify(update);
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      };
    } else {
      body = update;
    }

    return fetch(API.getQueryString(path, query), {
      body,
      headers,
      method: 'put'
    }).then(response => response.json());
  }

  /**
   * Removes data
   * @param {String} path
   * @param {Object} query
   * @returns {Promise}
   */
  static remove(path, query) {
    return fetch(API.getQueryString(path, query), {
      method: 'delete'
    }).then(response => response.json());
  }
}
