import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://files.cdn-files-a.com/uploads/10483955/2000_gi-67e44ca9eb2a9.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-rubik">
            <span className="animate-gradient-text">{t.siteTitle}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            {t.heroSubtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary h-12 text-white px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0"
            style={{ background: 'linear-gradient(135deg, #5FB8D6 0%, #5B72E8 100%)' }}
          >
            <Download className="w-5 h-5" />
            {t.discoverExtensions}
          </button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={scrollToAbout}
          className="text-white/70 hover:text-white transition-colors duration-300 animate-bounce"
          aria-label={t.discoverExtensions}
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </motion.div>
    </section>
  );
}