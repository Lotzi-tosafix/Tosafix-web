import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function NosafixGrid() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];

  return (
    <section id="nosafix-grid" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light">
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              {t.nosafix}
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-text-dark/70 dark:text-text-light/70">{t.nosafixGridDesc}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="flex flex-col w-full max-w-sm rounded-xl shadow h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-secondary/20 dark:border-accent/20">
            <div className="p-6 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-accent mb-4 mx-auto flex items-center justify-center">
                <div className="w-16 h-16 bg-white/80 dark:bg-white/20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm">
                    <Scissors className="w-10 h-10 object-contain text-secondary" />
                </div>
              </div>
              <h3 className="font-semibold tracking-tight text-xl text-text-dark dark:text-text-light">
                {t.cutfix}
              </h3>
            </div>
            <div className="p-6 pt-0 flex flex-col flex-grow">
              <p className="text-center text-text-dark/70 dark:text-text-light/70 mb-6 leading-relaxed flex-grow">
                {t.cutfixDescription}
              </p>
              <Link to="/nosafix" className="mt-auto">
                <button 
                    className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-300" 
                    style={{ 
                        background: 'linear-gradient(135deg, #B18BE8 0%, #007AFF 100%)',
                        boxShadow: '0 0 12px #B18BE840' 
                    }}
                >
                    {t.readMore}
                    <ArrowLeft className={`w-4 h-4 transform ${isHebrew ? '' : 'rotate-180'}`} />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}