import tr from './tr.json';
import en from './en.json';

export type Locale = 'tr' | 'en';

const locales: Record<Locale, typeof tr> = { tr, en };

let currentLocale: Locale = 'tr';

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t(key: string): string {
  const keys = key.split('.');
  let value: any = locales[currentLocale];
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === 'string' ? value : key;
}

export function getLetterName(audioFile: string): string {
  return t(`letters.${audioFile}`);
}

export function getAvailableLocales(): { code: Locale; label: string }[] {
  return [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' }
  ];
}
