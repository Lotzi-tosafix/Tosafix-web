
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import { Github, Heart } from 'lucide-react';

const extensions = [
  { nameKey: 'notiForumName', path: '/extensions/notiforum' },
  { nameKey: 'yaminaName', path: '/extensions/yamina' },
  { nameKey: 'netSkinName', path: '/extensions/netskin' },
  { nameKey: 'hebrewDateName', path: '/extensions/hebrewdate' },
  { nameKey: 'myEmojiName', path: '/extensions/myemoji' },
  { nameKey: 'edgeOpenerName', path: '/extensions/edgeopener' },
];

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="relative bg-dark/90 text-text-light mt-20 pt-20 pb-10 overflow-hidden backdrop-blur-lg border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5">
                  <div className="w-full h-full bg-dark rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                    <img src="https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_6916f3f610b79.png" alt="Tosafix" className="h-8 w-8" />
                  </div>
              </div>
              <h3 className="text-2xl font-bold font-rubik tracking-tight">
                {t.siteTitle}
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm font-light">
              {t.aboutText.substring(0, 120)}...
            </p>
            <div className="flex gap-4">
                <a href="https://github.com/Lotzi-tosafix/Tosafix-web" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-gray-400 hover:text-white border border-white/5 hover:border-white/20">
                    <Github size={20} />
                </a>
            </div>
             <div className="pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Heart size={16} className="text-rose-500 fill-rose-500" />
                    <span>{t.madeForCommunity}</span>
                </div>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-rubik text-white border-b border-white/10 pb-2 inline-block">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {[
                  { to: '/', label: t.home },
                  { to: '/nosafix', label: t.nosafix },
                  { to: '/contact', label: t.contact },
                  { to: '/developers', label: t.developers }
              ].map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-gray-400 hover:text-primary transition-colors inline-block hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
                        {link.label}
                    </Link>
                  </li>
              ))}
            </ul>
          </div>

          {/* Extensions */}
          <div>
            <h4 className="text-lg font-bold mb-6 font-rubik text-white border-b border-white/10 pb-2 inline-block">{t.extensions}</h4>
            <ul className="space-y-3">
              {extensions.map(ext => (
                <li key={ext.path}>
                  <Link to={ext.path} className="text-gray-400 hover:text-primary transition-colors inline-block hover:translate-x-1 rtl:hover:-translate-x-1 duration-200">
                    {t[ext.nameKey as keyof typeof t] as string}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {t.siteTitle}. {t.allRightsReserved}</p>
          <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">{t.privacyPolicyFooter}</Link>
              <Link to="/terms" className="hover:text-white transition-colors">{t.termsOfService}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
