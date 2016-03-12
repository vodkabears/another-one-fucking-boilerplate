import Polyglot from 'node-polyglot';
import { expect } from 'chai';
import sinon from 'sinon';
import I18N from 'lib/i18n';

describe('I18N', () => {
  before(() => {
    global.LANG = null;
  });

  after(() => {
    delete global.LANG;
  });

  describe('.setLang(lang)', () => {
    it('should set the language for i18n', () => {
      let spy = sinon.spy(Polyglot.prototype, 'locale');
      let lang = 'en';

      I18N.setLang(lang);

      expect(spy.calledWithExactly(lang)).to.be.true;
    });
  });

  describe('.include(mapper)', () => {
    it('should return a modular translation function', () => {
      expect(I18N.include(function() {})).to.be.a('function');
    });

    it('should use the locale from the global "LANG" variable', () => {
      let spy = sinon.spy();
      let lang = 'de';
      let globalLang = global.LANG;

      global.LANG = lang;
      I18N.include(spy);
      global.LANG = globalLang;

      expect(spy.calledWithExactly(lang)).to.be.true;
    });
  });

  describe('modular translation function', () => {
    let translations = {
      en: { default: { test: 'test' } },
      ru: { default: { test: 'тест' } }
    };
    let t;

    before(() => {
      t = I18N.include(lang => translations[lang]);
    });

    it('should correctly translate', () => {
      expect(t('test')).to.be.equal(translations.en.default.test);
    });

    it('should not contain translations of other modules', () => {
      let additionalTranslations = {
        en: { default: { test2: 'test' } },
        ru: { default: { test2: 'тест' } }
      };

      I18N.include(lang => additionalTranslations[lang]);

      expect(t('test2')).to.be.empty;
    });

    describe('smart pluralization', () => {
      let plurals = {
        en: {
          default: {
            plurals: '%{smart_count} item |||| %{smart_count} items'
          }
        },
        ru: {
          default: {
            plurals: '%{smart_count} предмет |||| %{smart_count} предмета |||| %{smart_count} предметов'
          }
        }
      };

      before(() => {
        t = I18N.include(lang => plurals[lang]);

        I18N.setLang('ru');
      });

      it('should correctly translate 1 item', () => {
        expect(t('plurals', 1)).to.be.equal('1 предмет');
      });

      it('should correctly translate 2 items', () => {
        expect(t('plurals', 2)).to.be.equal('2 предмета');
      });

      it('should correctly translate 5 items', () => {
        expect(t('plurals', 5)).to.be.equal('5 предметов');
      });

      it('should correctly translate 21 items', () => {
        expect(t('plurals', 21)).to.be.equal('21 предмет');
      });

      it('should correctly translate 22 items', () => {
        expect(t('plurals', 22)).to.be.equal('22 предмета');
      });

      it('should correctly translate 25 items', () => {
        expect(t('plurals', 25)).to.be.equal('25 предметов');
      });
    });
  });
});
