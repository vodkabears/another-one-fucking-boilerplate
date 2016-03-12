import I18N from 'lib/i18n';

export default I18N.include(lang => require(`./${lang}`));
