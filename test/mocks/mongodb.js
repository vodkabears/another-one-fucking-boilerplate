/* eslint-disable prefer-spread */

export default class MongoDBMock {
  /**
   * @param {Object} data Result data
   */
  constructor(data) {
    /**
     * @type {Object}
     */
    this.data = data;

    /**
     * @type {Array}
     */
    this.argumentsStack = [];
  }

  /**
   * You should call it with '.apply' ONLY!
   * @protected
   * @param {arguments} args
   * @returns {MongoDBMock}
   */
  _saveArguments() {
    let args = new Array(arguments.length);

    for (let i = 0, len = args.length; i < len; ++i) {
      args[i] = arguments[i];
    }

    this.argumentsStack.push(args);

    return this;
  }
}

let proto = MongoDBMock.prototype;

['collection', 'find', 'updateOne', 'limit', 'project'].forEach(method => {
  /**
   * @returns {MongoDBMock}
   */
  proto[method] = function() {
    return this._saveArguments.apply(this, arguments);
  };
});

['findOneAndUpdate', 'toArray'].forEach(method => {
  /**
   * @returns {Promise}
   */
  proto[method] = function() {
    this._saveArguments.apply(this, arguments);

    return Promise.resolve(this.data);
  };
});
