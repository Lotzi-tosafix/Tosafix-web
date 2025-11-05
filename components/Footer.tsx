import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-bg-dark text-text-light">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} {t.siteTitle}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}