
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Music, Activity } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

const nosafixTools = [
  {
    nameKey: 'cutfix',
    descKey: 'cutfixDescription',
    path: '/nosafix/fix-remover',
    icon: Scissors,
    gradient: 'from-orange-400 to-red-500',
    shadow: 'shadow-orange-500/20'
  },
  {
    nameKey: 'liveMusic',
    descKey: 'liveMusicDescription',
    path: '/nosafix/live-music',
    icon: Music,
    gradient: 'from-rose-500 to-pink-600',
    shadow: 'shadow-rose-500/20'
  },
  {
    nameKey: 'fixChecker',
    descKey: 'fixCheckerDescription',
    path: '/nosafix/fix-checker',
    icon: Activity,
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/20'
  }
];

export default function NosafixGrid() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="nosafix-grid" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] glass-card p-8 md:p-12 overflow-hidden border border-white/40 dark:border-white/10">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16 relative z-10"
            >
                <span className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 block">{t.nosafixTitle}</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-dark dark:text-text-light">
                    {t.nosafix}
                </h2>
                <p className="text-lg max-w-2xl mx-auto text-text-dark/70 dark:text-text-light/70">
                    {t.nosafixGridDesc}
                </p>
            </motion.div>
            
            <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10"
            >
            {nosafixTools.map((tool) => {
                const Icon = tool.icon;
                return (
                <motion.div key={tool.nameKey} variants={itemVariants} className="h-full">
                    <Link to={tool.path} className="group block h-full">
                    <div className={`h-full glass bg-white/50 dark:bg-black/20 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 border border-white/30 hover:border-white/60 flex flex-col items-center text-center hover:bg-white/80 dark:hover:bg-white/10`}>
                        
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} mb-6 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                             <Icon className="w-10 h-10 text-white" />
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-text-dark dark:text-text-light">
                            {t[tool.nameKey as keyof typeof t] as string}
                        </h3>
                        
                        <p className="text-text-dark/70 dark:text-text-light/70 mb-8 leading-relaxed flex-grow">
                            {t[tool.descKey as keyof typeof t] as string}
                        </p>

                         <div className="w-full py-3 rounded-xl bg-white/50 dark:bg-white/5 font-bold group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:text-white transition-all duration-300 shadow-sm">
                             {t.tryNow}
                         </div>
                    </div>
                    </Link>
                </motion.div>
                )
            })}
            </motion.div>
        </div>
      </div>
    </section>
  );
}
