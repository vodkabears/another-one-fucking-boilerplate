import todosProvider from './todos';
import SEO from 'server/models/seo';

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
        SEO: SEO.get('PageTypeTodosExample'),
        Todos: data.Todos
      };

      return data;
    });
}
