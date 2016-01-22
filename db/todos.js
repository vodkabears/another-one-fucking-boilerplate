/**
* @param {mongodb.Db} db
* @returns {Promise}
*/
export default function(db) {
  return db.createCollection('todos', {
    validator: {
      $or: [
        {
          $and: [
            { 'items.id': { $type: 'string' } },
            { 'items.text': { $type: 'string' } },
            { 'items.isCompleted': { $type: 'bool' } }
          ]
        },
        { items: { $size: 0 } }
      ]
    }
  });
}
