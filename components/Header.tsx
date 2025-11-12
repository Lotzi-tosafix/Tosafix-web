import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Languages, House, Mail, Share2, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const extensions = [
  { nameKey: 'notiForumName', path: '/extensions/notiforum', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png' },
  { nameKey: 'yaminaName', path: '/extensions/yamina', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png' },
  { nameKey: 'netSkinName', path: '/extensions/netskin', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png' },
  { nameKey: 'hebrewDateName', path: '/extensions/hebrewdate', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png' },
  { nameKey: 'myEmojiName', path: '/extensions/myemoji', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png' },
  { nameKey: 'edgeOpenerName', path: '/extensions/edgeopener', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png' },
];

const ExtensionsDropdown = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative group">
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 text-text-dark/70 hover:text-primary-hover hover:bg-bg-light px-3 py-2" style={{letterSpacing: '0.5px'}}>
        <span>{t.extensions}</span>
        <ChevronDown size={16} className="ms-1" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 border border-primary/30">
        <div className="py-2 grid grid-cols-1 gap-1">
          {extensions.map(ext => (
            <Link key={ext.path} to={ext.path} className="flex items-center gap-2 px-4 py-2 text-text-dark dark:text-text-light hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:text-primary-hover/80 rounded-md">
               <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t]} className="w-5 h-5 object-contain" />
              <span className="font-sans">{t[ext.nameKey as keyof typeof t]}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const handleLanguageToggle = () => {
        setLanguage(language === 'he' ? 'en' : 'he');
    };

    return (
        <button
            onClick={handleLanguageToggle}
            className="justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm h-8 rounded-md px-3 text-xs flex items-center gap-2 border-primary/40 hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:text-primary-hover hover:border-primary-hover/60"
        >
            <Languages size={16} />
            {language === 'he' ? 'EN' : 'עב'}
        </button>
    );
};

const ShareButton = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: t.shareTitle,
            text: t.shareText,
            url: window.location.origin,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.origin).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch(err => {
                console.error('Failed to copy URL: ', err);
            });
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={copied}
            title={copied ? t.linkCopied : t.share}
            className={`justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border bg-background shadow-sm h-8 rounded-md px-3 text-xs flex items-center border-primary/40 ${copied ? 'gap-2 whitespace-nowrap text-green-600 border-green-400 dark:text-green-400 dark:border-green-600 cursor-default' : 'hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 hover:text-primary-hover hover:border-primary-hover/60'}`}
        >
            {copied ? (
                <>
                    <Check size={16} />
                    {t.linkCopied}
                </>
            ) : (
                <Share2 size={16} />
            )}
        </button>
    );
};


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useLanguage();
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
    <header className={`sticky top-0 z-50 transition-transform duration-300 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-primary/30`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_690c942fa7d49.png" alt="Tosafix Logo" className="h-11 w-11 spin-once" />
            <div>
              <h1 className="text-2xl font-bold font-rubik" style={{ background: 'linear-gradient(135deg, #5FB8D6 0%, #9B7FD9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t.siteTitle}
              </h1>
              <p className="text-xs text-text-dark/70 dark:text-text-light/70 -mt-1" style={{ letterSpacing: '0.5px' }}>{t.heroTitle}</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link to="/" className="group flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-200 text-text-dark/70 dark:text-text-light/70 hover:text-primary-hover hover:bg-bg-light dark:hover:bg-bg-dark font-bold" style={{ letterSpacing: '0.5px' }}>
              <House size={16} className="transition-transform duration-300 group-hover:scale-110" />
              <span>{t.home}</span>
            </Link>
            <ExtensionsDropdown />
            <Link to="/contact" className="group flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-200 text-text-dark/70 dark:text-text-light/70 hover:text-primary-hover hover:bg-bg-light dark:hover:bg-bg-dark font-bold" style={{ letterSpacing: '0.5px' }}>
              <Mail size={16} className="transition-transform duration-300 group-hover:scale-110" />
              <span>{t.contact}</span>
            </Link>
            <ShareButton />
            <LanguageSwitcher />
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="group p-2 rounded-lg text-text-dark/70 dark:text-text-light/70 hover:text-primary-hover hover:bg-bg-light dark:hover:bg-bg-dark">
              {isOpen ? <X size={24} className="transition-transform duration-300 group-hover:scale-110" /> : <Menu size={24} className="transition-transform duration-300 group-hover:scale-110" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-bg-dark/95 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-bold text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-700">{t.home}</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-bold text-text-dark dark:text-text-light hover:bg-gray-100 dark:hover:bg-gray-700">{t.contact}</Link>
             <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            {extensions.map(ext => (
              <Link key={ext.path} to={ext.path} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t]} className="w-5 h-5 object-contain" />
                {t[ext.nameKey as keyof typeof t]}
              </Link>
            ))}
             <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
             <div className="px-3 py-2 flex items-center justify-start space-x-4 rtl:space-x-reverse">
                <LanguageSwitcher />
                <ShareButton />
             </div>
          </div>
        </div>
      )}
    </header>
  );
}