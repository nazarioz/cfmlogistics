import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en', // default language
    resources: {
      en: {
        translation: require('./locales/en.json'),
      },
      pt: {
        translation: require('./locales/pt.json'),
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 