import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations as translationsData, Language as TranslationLanguage } from '@/data/translations';

export type Language = 'ru' | 'az';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any; // Full translations object
}

// Use translations from translations.ts

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quiz-language');
      return (saved as Language) || 'ru';
    }
    return 'ru';
  });

  useEffect(() => {
    localStorage.setItem('quiz-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translationsData[language as TranslationLanguage];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: t || {} }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return {
    ...context,
    t: context.t || {},
  };
}
