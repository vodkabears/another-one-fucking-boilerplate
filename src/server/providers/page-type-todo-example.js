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

  return new Promise(resolve => {
    data.PageTypeTodoExample = {
      SEO: SEO.get({ pageName: 'PageTypeTodoExample' })
    };

    resolve(data);
  });
}
