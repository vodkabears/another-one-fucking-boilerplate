import Todos from 'server/models/todos';

/**
 * @param {Object} [request]
 * @param {Object} [data = {}]
 * @returns {Promise}
 */
export default function todoProvider(request, data = {}) {
  if (data.Todo) {
    return new Promise(resolve => resolve(data));
  }

  return Todos.get(request).then(items => {
    data.Todo = { items };

    return data;
  });
}
