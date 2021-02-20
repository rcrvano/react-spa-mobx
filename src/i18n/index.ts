import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import IntervalPlural from 'i18next-intervalplural-postprocessor';
import resources from './locales';

export const fallbackLng = 'ru';

i18n
  .use(LanguageDetector)
  .use(IntervalPlural)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng, // default language if there is no localization for browser language
    debug: false,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      lookupCookie: 'lang',
      lookupQuerystring: 'lang',
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
