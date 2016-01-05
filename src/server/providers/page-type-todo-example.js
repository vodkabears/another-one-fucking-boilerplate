import todoProvider from './todo';
import SEO from 'server/models/seo';

/**
 * @param {Object} [request]
 * @param {Object} [data = {}]
 * @returns {Promise}
 */
export default function pageTypeTodoExampleProvider(request, data = {}) {
  if (data.PageTypeTodoExample) {
    return new Promise(resolve => resolve(data));
  }

  return todoProvider(request, data)
    .then(() => {
      data.PageTypeTodoExample = {
        SEO: SEO.get('PageTypeTodoExample'),
        Todo: data.Todo
      };

      return data;
    });
}
