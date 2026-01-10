
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Languages, Home, Mail, Share2, Check, Sun, Moon, Plus, Code2, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';

const extensions = [
  { nameKey: 'notiForumName', path: '/extensions/notiforum', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png' },
  { nameKey: 'yaminaName', path: '/extensions/yamina', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png' },
  { nameKey: 'gfdName', path: '/extensions/gfd', icon: 'https://lh3.googleusercontent.com/r77r2zRyYLfTAWvBLy1zELxTgpCpRziU48cfEexOCC31KvdnettoQ1U58Amvgj6kCErQjX2GGIwe6DYV9SBAG-J03w=s120' },
  { nameKey: 'netSkinName', path: '/extensions/netskin', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png' },
  { nameKey: 'hebrewDateName', path: '/extensions/hebrewdate', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png' },
  { nameKey: 'myEmojiName', path: '/extensions/myemoji', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png' },
  { nameKey: 'edgeOpenerName', path: '/extensions/edgeopener', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png' },
];

const ExtensionsDropdown = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative group">
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all duration-300 h-10 text-text-dark/80 dark:text-text-light/80 hover:text-primary hover:bg-black/5 dark:hover:bg-white/10 px-4 py-2" style={{letterSpacing: '0.5px'}}>
        <span>{t.extensions}</span>
        <ChevronDown size={16} className="ms-1 transition-transform duration-300 group-hover:rotate-180" />
      </button>
      <div className={`absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] opacity-0 invisible group-hover:opacity-100 group-hover:visible z-50 border border-white/20 dark:border-gray-700 p-2 transform origin-top transition-all duration-300 scale-95 group-hover:scale-100 translate-y-2 group-hover:translate-y-0`}>
        <div className="grid grid-cols-1 gap-1">
          {extensions.map(ext => (
            <Link key={ext.path} to={ext.path} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-dark dark:text-text-light hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary rounded-2xl transition-colors">
               <div className="w-8 h-8 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center p-1">
                 <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t] as string} className="w-full h-full object-contain" />
               </div>
              <span>{t[ext.nameKey as keyof typeof t] as string}</span>
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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/40 hover:bg-white/50 dark:hover:bg-gray-700/60 text-text-dark dark:text-text-light transition-all shadow-sm hover:shadow-md border border-white/20 dark:border-gray-700 group backdrop-blur-md"
        >
            <Languages size={18} className="group-hover:scale-110 transition-transform" />
            <span className="sr-only">{language === 'he' ? 'EN' : 'עב'}</span>
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
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shadow-sm hover:shadow-md border border-white/20 dark:border-gray-700 backdrop-blur-md ${copied ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-white/20 dark:bg-gray-800/40 hover:bg-white/50 dark:hover:bg-gray-700/60 text-text-dark dark:text-text-light group'}`}
        >
            {copied ? <Check size={18} /> : <Share2 size={18} className="group-hover:scale-110 transition-transform" />}
        </button>
    );
};

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <button
            onClick={toggleTheme}
            title={t.toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/40 hover:bg-white/50 dark:hover:bg-gray-700/60 text-text-dark dark:text-text-light transition-all shadow-sm hover:shadow-md border border-white/20 dark:border-gray-700 overflow-hidden backdrop-blur-md"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
            </AnimatePresence>
        </button>
    );
};

const SearchButton = ({ onClick }: { onClick: () => void }) => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <button
            onClick={onClick}
            title={t.search}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/40 hover:bg-white/50 dark:hover:bg-gray-700/60 text-text-dark dark:text-text-light transition-all shadow-sm hover:shadow-md border border-white/20 dark:border-gray-700 group backdrop-blur-md"
        >
            <Search size={18} className="transition-transform group-hover:scale-110" />
        </button>
    );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsSearchOpen(true);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <header 
                className="pointer-events-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg border border-white/20 dark:border-white/10 rounded-full w-full max-w-7xl transition-all duration-500"
            >
                <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Area */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                <img src="https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_6916f3f610b79.png" alt="Tosafix Logo" className="h-10 w-10 relative z-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold font-rubik tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left">
                                    {t.siteTitle}
                                </h1>
                            </div>
                        </Link>
              
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 shadow-inner">
                            {[
                                { to: '/', icon: Home, label: t.home },
                                { to: '/nosafix', icon: Plus, label: t.nosafix },
                                { to: '/contact', icon: Mail, label: t.contact },
                                { to: '/developers', icon: Code2, label: t.developers },
                            ].map((item) => (
                                <Link 
                                    key={item.to}
                                    to={item.to} 
                                    className={`group flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 font-bold text-sm ${
                                        location.pathname === item.to 
                                        ? 'bg-white dark:bg-gray-800 text-primary shadow-md' 
                                        : 'text-text-dark/70 dark:text-text-light/70 hover:text-primary hover:bg-white/40 dark:hover:bg-white/10'
                                    }`}
                                >
                                    <item.icon size={16} className={location.pathname === item.to ? 'text-primary' : 'opacity-70 group-hover:opacity-100 group-hover:text-primary'} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                            <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1"></div>
                            <ExtensionsDropdown />
                        </nav>

                        {/* Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <SearchButton onClick={() => setIsSearchOpen(true)} />
                            <LanguageSwitcher />
                            <ThemeToggleButton />
                            <ShareButton />
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-3">
                            <SearchButton onClick={() => setIsSearchOpen(true)} />
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full text-text-dark dark:text-text-light hover:bg-white/20 transition-colors">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed top-24 left-4 right-4 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700 overflow-hidden md:hidden"
            >
              <div className="p-4 space-y-2">
                 {[
                    { to: '/', icon: Home, label: t.home },
                    { to: '/nosafix', icon: Plus, label: t.nosafix },
                    { to: '/contact', icon: Mail, label: t.contact },
                    { to: '/developers', icon: Code2, label: t.developers },
                ].map((item) => (
                    <Link 
                        key={item.to}
                        to={item.to} 
                        className="flex items-center gap-4 px-4 py-3 rounded-2xl text-lg font-medium text-text-dark dark:text-text-light hover:bg-primary/10 active:scale-95 transition-all"
                    >
                        <div className="p-2 bg-primary/20 rounded-xl text-primary">
                            <item.icon size={20} />
                        </div>
                        {item.label}
                    </Link>
                ))}
                
                 <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2">
                    <p className="px-4 text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{t.extensions}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {extensions.map(ext => (
                        <Link key={ext.path} to={ext.path} className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-primary/10 transition-colors text-center border border-gray-100 dark:border-gray-700">
                            <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t] as string} className="w-8 h-8 object-contain" />
                            <span className="text-xs font-medium truncate w-full">{t[ext.nameKey as keyof typeof t] as string}</span>
                        </Link>
                        ))}
                    </div>
                 </div>

                 <div className="flex items-center justify-between px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <LanguageSwitcher />
                    <ThemeToggleButton />
                    <ShareButton />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
