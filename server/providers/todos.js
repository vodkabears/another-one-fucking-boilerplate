import Todos from 'server/models/todos';

/**
 * @param {Object} request
 * @param {Object} [data = {}]
 * @returns {Promise}
 */
export default function todosProvider(request, data = {}) {
  if (data.Todos) {
    return Promise.resolve(data);
  }

  return Todos.get(request).then(items => {
    data.Todos = { items };

    return data;
  });
}
