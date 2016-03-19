import Polyglot from 'node-polyglot';
import uuid from 'node-uuid';
import config from 'config/common';

let i18n = new Polyglot();

export default class I18N {
  /**
   * Set the language
   * @param {String} lang
   */
  static setLang(lang) {
    i18n.locale(lang);
  }

  /**
   * Include translations to the resources
   * @param {Function} mapper Map translations
   * @returns {Function} Modular translation function
   */
  static include(mapper) {
    let namespace = uuid.v4();
    let translations = (LANG ? [LANG] : config.langs).map(lang => {
      let module = mapper(lang);

      return {
        lang,
        module: module && module.default || module
      };
    });

    i18n.extend(translations.reduce((module, translation) => {
      module[translation.lang] = {
        [namespace]: translation.module
      };

      return module;
    }, {}));

    return function(key, options) {
      return i18n.t(`${i18n.locale()}.${namespace}.${key}`, typeof options === 'number' ?
        options :
        Object.assign({ _: '' }, options)
      );
    };
  }
}
