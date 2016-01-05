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
   * @param {String} pageName
   * @returns {Object}
   */
  static get(pageName) {
    return PAGES[pageName];
  }
}
