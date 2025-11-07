
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language, isHebrew } = useLanguage();
  const t = translations[language];

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const buttonPositionClass = isHebrew ? 'right-6' : 'left-6';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-6 ${buttonPositionClass} bg-primary hover:bg-primary-hover text-text-dark p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-110`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          aria-label={t.backToTop}
          title={t.backToTop}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;