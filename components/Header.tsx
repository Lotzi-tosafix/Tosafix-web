
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Languages, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { translations } from '../translations/translations';

const extensions = [
  { nameKey: 'notiForumName', path: '/extensions/notiforum', logo: 'https://files.cdn-files-a.com/uploads/10483955/400_67e410c38cc1d.png' },
  { nameKey: 'yaminaName', path: '/extensions/yamina', logo: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png' },
  { nameKey: 'netSkinName', path: '/extensions/netskin', logo: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png' },
  { nameKey: 'hebrewDateName', path: '/extensions/hebrewdate', logo: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png' },
  { nameKey: 'myEmojiName', path: '/extensions/myemoji', logo: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png' },
  { nameKey: 'edgeOpenerName', path: '/extensions/edgeopener', logo: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png' },
];

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <Link 
    to={to} 
    className={`font-bold font-assistant tracking-wide transition-colors duration-200 text-text-light hover:text-text-light/80`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, children }) => (
  <Link to={to} className="block px-3 py-2 rounded-md text-base font-bold font-assistant text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-700">{children}</Link>
);


const ExtensionsDropdown = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative group">
      <button className={`flex items-center font-bold font-assistant tracking-wide transition-colors duration-200 text-text-light hover:text-text-light/80`}>
        <span>{t.extensions}</span>
        <ChevronDown size={16} className="ms-1" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-bg-light dark:bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="py-2 grid grid-cols-1 gap-1">
          {extensions.map(ext => (
            <Link key={ext.path} to={ext.path} className="flex items-center px-4 py-2 text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={ext.logo} alt={t[ext.nameKey as keyof typeof t]} className="w-6 h-6 me-3 rounded-md" />
              <span className="font-assistant">{t[ext.nameKey as keyof typeof t]}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


const MobileExtensionsDropdown = () => {
    const [isExtOpen, setIsExtOpen] = useState(false);
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div>
            <button onClick={() => setIsExtOpen(!isExtOpen)} className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-bold font-assistant text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-700">
                <span>{t.extensions}</span>
                <ChevronDown size={20} className={`transition-transform duration-200 ${isExtOpen ? 'rotate-180' : ''}`} />
            </button>
            {isExtOpen && (
                <div className="ps-4 border-s-2 border-gray-200 dark:border-gray-600 ms-2">
                    {extensions.map(ext => (
                         <Link key={ext.path} to={ext.path} className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                            <img src={ext.logo} alt={t[ext.nameKey as keyof typeof t]} className="w-5 h-5 me-3 rounded-sm" />
                            <span className="font-assistant">{t[ext.nameKey as keyof typeof t]}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative group">
      <button 
        className={`flex items-center font-medium transition-colors duration-200 text-text-light hover:text-text-light/80`}
        title={t.language}
        aria-label={t.language}
      >
        <Languages size={20} />
      </button>
      <div className="absolute right-0 mt-2 w-28 bg-bg-light dark:bg-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="py-1">
          <button onClick={() => setLanguage('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'bg-gray-100 dark:bg-gray-700 text-text-dark dark:text-text-light' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}>English</button>
          <button onClick={() => setLanguage('he')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'he' ? 'bg-gray-100 dark:bg-gray-700 text-text-dark dark:text-text-light' : 'text-gray-700 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-gray-700`}>עברית</button>
        </div>
      </div>
    </div>
  );
};

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <button 
      onClick={toggleTheme} 
      className={`p-2 rounded-full transition-colors duration-200 text-text-light hover:bg-white/20`}
      aria-label={t.toggleTheme}
      title={t.toggleTheme}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, isHebrew } = useLanguage();
  const t = translations[language];
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''} bg-gradient-to-r from-primary to-secondary`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className={`flex items-center text-2xl font-extrabold font-assistant text-text-light`}>
              <img src="https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_690c942fa7d49.png" alt="Tosafix Logo" className="h-10 w-10 me-3" style={{ filter: 'drop-shadow(0 0 5px white)' }} />
              {t.siteTitle}
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <NavLink to="/">{t.home}</NavLink>
            <ExtensionsDropdown />
            <NavLink to="/contact">{t.contact}</NavLink>
            <div className='flex items-center space-x-2 rtl:space-x-reverse'>
                <LanguageSwitcher />
                <ThemeSwitcher />
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`ms-2 text-text-light`}
              title={t.menu}
              aria-label={t.menu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-light dark:bg-bg-dark shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/">{t.home}</MobileNavLink>
            <MobileExtensionsDropdown />
            <MobileNavLink to="/contact">{t.contact}</MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
}
