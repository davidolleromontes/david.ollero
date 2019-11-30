import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';

import en from '../assets/languages/en.json';
import es from '../assets/languages/es.json';

const resources = { en: { translation: en }, es: { translation: es } };

export const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback:any) => {
    const l =
      (Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier
      ).substring(0, 2) || 'es';

    return callback(l);
  },
  init: () => undefined,
  cacheUserLanguage: () => undefined,
};

export const changeLanguage = (lang:string) => {
  i18n.changeLanguage(lang);
};

export const init = () =>
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(
      {
        resources,
        lng: 'es',
        debug: __DEV__,
        // defaultNS: 'translation',
        fallbackLng: 'es',
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
          escapeValue: false, // react already safes from xss
          // formatSeparator: ',',
        },
        // react: {
        //   wait: true,
        // },
      },
      () => console.log('callback')
    );

export default i18n;

// export const en = enJSON;
