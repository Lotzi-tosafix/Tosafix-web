import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const extensions = [
  { nameKey: 'notiForumName', path: '/extensions/notiforum' },
  { nameKey: 'yaminaName', path: '/extensions/yamina' },
  { nameKey: 'netSkinName', path: '/extensions/netskin' },
  { nameKey: 'hebrewDateName', path: '/extensions/hebrewdate' },
];

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-bg-dark text-text-light mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <img src="https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_6916f3f610b79.png" alt="Tosafix Logo" className="h-10 w-10" />
              <h3 className="text-xl font-bold font-rubik" style={{ background: 'linear-gradient(135deg, #79C9E8 0%, #B18BE8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t.siteTitle}
              </h3>
            </div>
            <p className="text-text-light/70 mb-4 leading-relaxed">
              {t.aboutText.substring(0, 150)}...
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-rubik">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-light/70 hover:text-accent transition-colors">{t.home}</Link>
              </li>
              <li>
                <Link to="/nosafix" className="text-text-light/70 hover:text-accent transition-colors">{t.nosafix}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-text-light/70 hover:text-accent transition-colors">{t.contact}</Link>
              </li>
              <li>
                <Link to="/developers" className="text-text-light/70 hover:text-accent transition-colors">{t.developers}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-rubik">{t.extensions}</h4>
            <ul className="space-y-2">
              {extensions.map(ext => (
                <li key={ext.path}>
                  <Link to={ext.path} className="text-text-light/70 hover:text-accent transition-colors">
                    {/* FIX: Cast dynamic translation lookup to string to resolve type error. */}
                    {t[ext.nameKey as keyof typeof t] as string}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-text-light/50">© {new Date().getFullYear()} {t.siteTitle}. {language === 'he' ? 'כל הזכויות שמורות.' : 'All Rights Reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}