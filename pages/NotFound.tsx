import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass, Wrench, Ghost } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function NotFound() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="text-[15rem] font-black text-primary font-rubik tracking-tighter">404</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Ghost className="w-32 h-32 text-primary drop-shadow-[0_0_15px_rgba(var(--color-primary),0.5)]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light font-rubik mt-8">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.notFoundTitle}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-medium text-text-dark/80 dark:text-text-light/80">
              {t.notFoundSubtitle}
            </h2>
            
            <p className="max-w-xl mx-auto text-base text-text-dark/60 dark:text-text-light/60 leading-relaxed">
              {t.notFoundDesc}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <Link to="/" className="group relative p-1 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 hover:from-primary hover:to-secondary transition-all duration-300">
            <div className="h-full w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-[0.98]">
              <Home className="w-8 h-8 text-primary" />
              <span className="font-bold text-text-dark dark:text-text-light">{t.backToHome}</span>
            </div>
          </Link>

          <Link to="/#extensions" className="group relative p-1 rounded-2xl bg-gradient-to-br from-secondary/20 to-accent/20 hover:from-secondary hover:to-accent transition-all duration-300">
            <div className="h-full w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-[0.98]">
              <Compass className="w-8 h-8 text-secondary" />
              <span className="font-bold text-text-dark dark:text-text-light">{t.exploreExtensions}</span>
            </div>
          </Link>

          <Link to="/nosafix" className="group relative p-1 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 hover:from-accent hover:to-primary transition-all duration-300">
            <div className="h-full w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-transform duration-300 group-hover:scale-[0.98]">
              <Wrench className="w-8 h-8 text-accent" />
              <span className="font-bold text-text-dark dark:text-text-light">{t.tryNosafix}</span>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
