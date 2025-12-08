import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ChevronDown, Download, Star, Zap, Shield, Github } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const scrollToExtensions = () => {
    document.getElementById('extensions-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Floating animation variants
  const floatingVariant: Variants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-visible pt-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
            
            {/* Text Content */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex-1 text-center lg:text-start"
            >
                <h1 className="text-6xl md:text-8xl font-extrabold font-rubik tracking-tight mb-6 leading-[1.1]">
                    <span className="block text-text-dark dark:text-white drop-shadow-sm">
                        {t.siteTitle}
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x drop-shadow-sm">
                        {t.heroTitle}
                    </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-text-dark/70 dark:text-text-light/80 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                    {t.heroSubtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                    <button
                        onClick={scrollToExtensions}
                        className="relative group px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-[0_10px_30px_-10px_rgba(121,201,232,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(177,139,232,0.6)] transition-all duration-300 hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {t.discoverExtensions} <Download size={20} />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                </div>

                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-text-dark/50 dark:text-text-light/50 border-t border-gray-200/30 dark:border-gray-700/30 pt-8">
                    <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold tracking-wide">{t.topRated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield size={18} className="text-green-400" />
                        <span className="text-sm font-bold tracking-wide">{t.secure}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap size={18} className="text-primary" />
                        <span className="text-sm font-bold tracking-wide">{t.fast}</span>
                    </div>
                </div>
            </motion.div>

            {/* 3D Visual Element */}
            <motion.div 
                className="flex-1 relative w-full max-w-lg aspect-square perspective-1000"
                initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, type: "spring" }}
            >
                 <motion.div 
                    variants={floatingVariant}
                    initial="initial"
                    animate="animate"
                    className="relative z-20 w-full h-full"
                 >
                    {/* Main Glass Card */}
                    <div className="absolute inset-8 glass-card rounded-[2.5rem] p-10 flex flex-col items-center justify-center border border-white/40 dark:border-white/10 z-20 transition-transform hover:scale-105 duration-500 bg-white/40 dark:bg-gray-900/40">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem] pointer-events-none"></div>
                        <motion.img 
                            src="https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_6916f3f610b79.png" 
                            alt="Logo" 
                            className="w-40 h-40 drop-shadow-2xl mb-6"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <h3 className="text-3xl font-bold text-text-dark dark:text-white mb-2">{t.siteTitle}</h3>
                        <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                        <p className="text-primary font-medium mt-4">{t.chromeExtensionsHub}</p>
                    </div>

                    {/* Floating Elements */}
                    <motion.div 
                        animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 0 }}
                        className="absolute top-0 right-0 p-4 glass-card rounded-3xl shadow-2xl z-30 border border-white/50"
                    >
                        <img src="https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png" className="w-14 h-14" alt="Noti" />
                    </motion.div>
                    
                    <motion.div 
                        animate={{ y: [0, -30, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-10 -left-4 p-4 glass-card rounded-3xl shadow-2xl z-30 border border-white/50"
                    >
                         <img src="https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png" className="w-14 h-14" alt="Yamina" />
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                        className="absolute -bottom-4 right-12 p-4 glass-card rounded-3xl shadow-2xl z-30 border border-white/50"
                    >
                         <img src="https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png" className="w-14 h-14" alt="NetSkin" />
                    </motion.div>
                 </motion.div>
            </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToExtensions}
          className="flex flex-col items-center gap-2 text-text-dark/40 dark:text-text-light/40 hover:text-primary transition-colors duration-300"
          aria-label={t.discoverExtensions}
        >
            <span className="text-xs font-bold uppercase tracking-[0.2em]">{t.scrollDown}</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}