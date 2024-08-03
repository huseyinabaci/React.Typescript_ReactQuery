import create from 'zustand';
import { locales } from '../constants/Locales';

type Language = 'en' | 'tr';

interface LanguageStore {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof locales['tr'];
}

const useLanguageStore = create<LanguageStore>((set) => ({
  currentLanguage: 'tr',
  setLanguage: (lang) => set({ 
    currentLanguage: lang, 
    translations: locales[lang] 
  }),
  translations: locales['tr'],
}));

export default useLanguageStore;
