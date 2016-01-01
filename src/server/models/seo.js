const PAGES = {
  PageTypeWelcome: {
    title: 'Boilerplate',
    description: 'Next-gen boilerplate with trendy front-end technologies'
  },

  PageTypeTodoExample: {
    title: 'Boilerplate • TodoMVC',
    description: 'Todo apps with Boilerplate'
  }
};

export default class SEO {
  /**
   * @param {query} Object
   *  @param {String} pageName
   * @returns {Object}
   */
  static get(query) {
    return PAGES[query.pageName];
  }
}
