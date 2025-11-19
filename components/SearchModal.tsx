
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Command, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

interface SearchResult {
  title: string;
  description: string;
  path: string;
  category: string;
  external?: boolean;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Construct search data based on current language
  const searchData: SearchResult[] = [
    { title: t.home, description: t.heroSubtitle, path: '/', category: t.menu },
    { title: t.nosafix, description: t.nosafixGridDesc, path: '/nosafix', category: t.menu },
    { title: t.contact, description: t.contactSubtitle, path: '/contact', category: t.menu },
    { title: t.developers, description: t.devIntro, path: '/developers', category: t.menu },
    
    // Extensions
    { title: t.notiForumName, description: t.notiForumGridDesc, path: '/extensions/notiforum', category: t.extensions },
    { title: t.yaminaName, description: t.yaminaGridDesc, path: '/extensions/yamina', category: t.extensions },
    { title: t.netSkinName, description: t.netSkinGridDesc, path: '/extensions/netskin', category: t.extensions },
    { title: t.hebrewDateName, description: t.hebrewDateGridDesc, path: '/extensions/hebrewdate', category: t.extensions },
    { title: t.myEmojiName, description: t.myEmojiGridDesc, path: '/extensions/myemoji', category: t.extensions },
    { title: t.edgeOpenerName, description: t.edgeOpenerGridDesc, path: '/extensions/edgeopener', category: t.extensions },

    // Tools
    { title: t.cutfix, description: t.cutfixDescription, path: '/nosafix/fix-remover', category: t.nosafix },
    { title: t.liveMusic, description: t.liveMusicDescription, path: '/nosafix/live-music', category: t.nosafix },
  ];

  // Filter logic
  const results = query.trim() === '' 
    ? searchData.filter(item => item.category === t.extensions).slice(0, 5) // Default suggestions
    : searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      // Focus input after a small delay to allow animation to start
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleNavigate = (path: string, external?: boolean) => {
    if (external) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleNavigate(results[selectedIndex].path, results[selectedIndex].external);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4 pointer-events-none"
          >
            {/* Modal Content */}
            <div 
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-200 dark:border-gray-700 flex flex-col max-h-[70vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header / Input */}
              <div className="relative flex items-center border-b border-gray-100 dark:border-gray-800 p-4">
                <Search className="w-5 h-5 text-gray-400 absolute ltr:left-6 rtl:right-6" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-none outline-none text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 ltr:pl-10 rtl:pr-10 font-sans"
                  autoComplete="off"
                />
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
                >
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 mx-2">
                    <span className="text-xs">ESC</span>
                  </kbd>
                  <X className="w-5 h-5 sm:hidden" />
                </button>
              </div>

              {/* Results List */}
              <div className="overflow-y-auto p-2 custom-scrollbar">
                {query.trim() === '' && (
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {t.quickAccess}
                    </div>
                )}
                
                {results.length > 0 ? (
                  <ul className="space-y-1">
                    {results.map((result, index) => (
                      <li key={`${result.path}-${index}`}>
                        <button
                          onClick={() => handleNavigate(result.path, result.external)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full text-start flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                            index === selectedIndex 
                              ? 'bg-primary/10 dark:bg-primary/20' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                             index === selectedIndex 
                             ? 'bg-primary/20 text-primary' 
                             : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                          }`}>
                            {result.external ? <ExternalLink size={18} /> : <ArrowRight size={18} className="rtl:rotate-180" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h4 className={`font-medium truncate ${
                                    index === selectedIndex 
                                    ? 'text-primary dark:text-primary-light' 
                                    : 'text-gray-900 dark:text-gray-100'
                                }`}>
                                {result.title}
                                </h4>
                                <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                    {result.category}
                                </span>
                            </div>
                            <p className={`text-sm truncate ${
                                index === selectedIndex 
                                ? 'text-primary/70 dark:text-primary-light/70' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {result.description}
                            </p>
                          </div>
                          {index === selectedIndex && (
                             <div className="hidden sm:block text-primary">
                                <span className="text-xs">Enter ↵</span>
                             </div>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>{t.noResults} "{query}"</p>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 flex justify-between items-center">
                 <div className="flex gap-4">
                    <span className="hidden sm:flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-[10px]">↵</kbd> {isHebrew ? 'לבחירה' : 'to select'}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-[10px]">↑↓</kbd> {isHebrew ? 'לניווט' : 'to navigate'}
                    </span>
                 </div>
                 <div className="flex items-center gap-1 opacity-50">
                    <Command size={12} />
                    <span>+ K</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
