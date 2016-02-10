import { ObjectID } from 'mongodb';

const COLLECTION = 'todos';

export default class Todos {
  /**
   * @param {Object} request
   * @returns {Promise}
   */
  static get(request) {
    return request.db.collection(COLLECTION)
      .find({ _id: request.sessionID })
      .limit(1)
      .project({ items: 1 })
      .toArray()
      .then(data => {
        let list = data[0];

        return list && list.items || [];
      });
  }

  /**
   * @param {Object} request
   * @param {Object} item
   * @returns {Promise}
   */
  static add(request, item) {
    let text = item && item.text;

    if (!text) {
      return;
    }

    item = {
      id: (new ObjectID()).toHexString(),
      text: text.trim(),
      isCompleted: item.isCompleted
    };

    return request.db.collection(COLLECTION).findOneAndUpdate(
      { _id: request.sessionID },
      { $push: { items: item } },
      { upsert: true, returnOriginal: false, projection: { items: 1 } }
    ).then(data => {
      let value = data.value;

      return value && value.items || [];
    });
  }

  /**
   * @param {Object} request
   * @param {String} text
   * @param {String} id
   * @returns {Promise}
   */
  static edit(request, text, id) {
    if (!text || !id) {
      return;
    }

    return request.db.collection(COLLECTION).findOneAndUpdate(
      { _id: request.sessionID, 'items.id': id },
      { $set: { 'items.$.text': text.trim() } },
      { returnOriginal: false, projection: { items: 1 } }
    ).then(data => {
      let value = data.value;

      return value && value.items || [];
    });
  }

  /**
   * @param {Object} request
   * @param {Boolean} isCompleted
   * @param {String|String[]} ids
   * @returns {Object[]}
   */
  static toggle(request, isCompleted, ids) {
    Array.isArray(ids) || (ids = [ids]);

    if (typeof isCompleted !== 'boolean' || !ids[0]) {
      return;
    }

    let collection = request.db.collection(COLLECTION);
    let sessionID = request.sessionID;

    // http://stackoverflow.com/questions/4669178/how-to-update-multiple-array-elements-in-mongodb
    // https://jira.mongodb.org/browse/SERVER-1243
    return collection
      .find({ _id: sessionID })
      .limit(1)
      .project({ items: 1 })
      .toArray()
      .then(data => {
        let list = data[0];
        let items = list && list.items;
        let promises = [];

        items && items.forEach(item => {
          let id = item.id;

          if (ids.includes(id)) {
            item.isCompleted = isCompleted;
            promises.push(collection.updateOne(
              { _id: sessionID, 'items.id': id },
              { $set: { 'items.$.isCompleted': isCompleted } }
            ));
          }
        });

        return items ? Promise.all(promises).then(() => items) : [];
      });
  }

  /**
   * @param {Object} request
   * @param {String|String[]} ids
   * @returns {Promise}
   */
  static remove(request, ids) {
    Array.isArray(ids) || (ids = [ids]);

    if (!ids[0]) {
      return;
    }

    return request.db.collection(COLLECTION).findOneAndUpdate(
      { _id: request.sessionID },
      { $pull: { items: { id: { $in: ids } } } },
      { returnOriginal: false, projection: { items: 1 } }
    ).then(data => {
      let value = data.value;

      return value && value.items || [];
    });
  }
}
