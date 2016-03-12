import todosProvider from './todos';

/**
 * @param {Object} request
 * @param {Object} [data = {}]
 * @returns {Promise}
 */
export default function pageTypeTodosExampleProvider(request, data = {}) {
  if (data.PageTypeTodosExample) {
    return Promise.resolve(data);
  }

  return todosProvider(request, data)
    .then(() => {
      data.PageTypeTodosExample = {
        Todos: data.Todos
      };

      return data;
    });
}
