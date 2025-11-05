
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'he' | 'en';
  setLanguage: (lang: 'he' | 'en') => void;
  isHebrew: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
    children: ReactNode;
}

// FIX: Explicitly type the component with React.FC to potentially resolve a type-checking issue with the children prop.
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<'he' | 'en'>('he');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage') as 'he' | 'en' | null;
    
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    } else {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      if (browserLang.startsWith('en')) {
        setLanguageState('en');
      } else {
        setLanguageState('he');
      }
    }
  }, []);

  const setLanguage = (lang: 'he' | 'en') => {
    localStorage.setItem('siteLanguage', lang);
    setLanguageState(lang);
  };
  
  const isHebrew = language === 'he';

  const value = { language, setLanguage, isHebrew };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
