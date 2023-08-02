import langEN from '../i18n/langEN'
import langFR from '../i18n/langFR'
import {merge} from "../utils/utils";

export type LocaleOption = typeof langEN;

const LOCALE_EN = 'EN';
const DEFAULT_LOCALE = LOCALE_EN;
let USER_LOCALE: string;

const localeStorage: Record<string, LocaleOption> = {};

export const SYSTEM_LANG = (function () {
    return DEFAULT_LOCALE;
})();

export function registerLocale(locale: string, localeObj: LocaleOption): void {
    locale = locale.toUpperCase();
    localeStorage[locale] = localeObj;
}

export function createLocaleObject(lang?: string, localeObj?: LocaleOption): LocaleOption {
    if (lang) {
        const localeObj = localeStorage[lang.toUpperCase()] || {} as LocaleOption;
        if (lang === LOCALE_EN) {
            return {...localeObj};
        } else {
            return merge({...localeObj}, {...localeStorage[DEFAULT_LOCALE]});
        }
    } else {
        return merge({...localeObj}, {...localeStorage[DEFAULT_LOCALE]});
    }
}

export function setUserLocale(lang?: string): void {
    if (lang) {
        USER_LOCALE = lang;
        const userLocale = createLocaleObject(lang);
        registerLocale(lang, userLocale);
    }
}

export function getLocale(lang?: string): LocaleOption {
    if (lang) {
        return localeStorage[lang];
    } else if (USER_LOCALE) {
        return localeStorage[USER_LOCALE];
    } else {
        return localeStorage[DEFAULT_LOCALE];
    }
}

export function getLocaleLang(): string {
    return USER_LOCALE || DEFAULT_LOCALE;
}

export function getSystemLang(): string {
    return (document.documentElement.lang || navigator.language || (navigator as any).browserLanguage).toUpperCase();
}

export function getLabel(localeObj: Record<string, any>, key: string): string {
    if (localeObj[key] !== undefined && typeof localeObj[key] === 'string') {
        return localeObj[key];
    } else return key;
}


registerLocale(LOCALE_EN, langEN);
registerLocale('FR', langFR);
