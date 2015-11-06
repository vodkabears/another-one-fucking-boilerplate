const RE_SLASH = /\/(\w?)/g;

/**
 * Converts a path to the page type
 * @param {String} path Format: '/route/one'
 * @returns {String|null} Format: 'pageRouteOne'
 */
export default function getPageType(path) {
  if (!path) {
    return null;
  }

  return 'page' + path.replace(RE_SLASH, (all, letter) => {
    return letter.toUpperCase();
  });
}
