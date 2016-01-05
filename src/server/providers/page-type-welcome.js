import SEO from 'server/models/seo';

/**
 * @param {Object} [request]
 * @param {Object} [data = {}]
 * @returns {Promise}
 */
export default function pageTypeWelcomeProvider(request, data = {}) {
  if (data.PageTypeWelcome) {
    return new Promise(resolve => resolve(data));
  }

  return new Promise(resolve => {
    data.PageTypeWelcome = {
      SEO: SEO.get('PageTypeWelcome')
    };

    resolve(data);
  });
}
