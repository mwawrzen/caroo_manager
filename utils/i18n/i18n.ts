import * as enLang from '@/utils/i18n/locals/en.json';
import * as plLang from '@/utils/i18n/locals/pl.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: enLang },
  pl: { translation: plLang }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'pl',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
