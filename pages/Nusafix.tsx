import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, ArrowLeft, Music } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const tools = [
  {
    nameKey: 'cutfix',
    descKey: 'cutfixDescription',
    path: '/nosafix/fix-remover',
    icon: Scissors,
    gradient: 'from-secondary to-accent'
  },
  {
    nameKey: 'liveMusic',
    descKey: 'liveMusicDescription',
    path: '/nosafix/live-music',
    icon: Music,
    gradient: 'from-rose-500 to-pink-500'
  }
];

export default function Nosafix() {
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
    <main className="flex-1">
      <div className="min-h-screen bg-gradient-to-b from-bg-light to-white dark:from-bg-dark dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light mb-6 font-assistant">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{t.nosafix}</span>
            </h1>
            <p className="text-xl text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto leading-relaxed">{t.nosafixTitle}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.div key={tool.nameKey} variants={itemVariants} className="flex">
                  <Link to={tool.path} className="flex flex-col w-full max-w-sm mx-auto rounded-xl shadow h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-secondary/20 dark:border-accent/20 cursor-pointer">
                    <div className="p-6 text-center">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} mb-4 mx-auto flex items-center justify-center`}>
                        <div className="w-16 h-16 bg-white/80 dark:bg-white/20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm">
                          <Icon className={`w-10 h-10 object-contain ${tool.nameKey === 'cutfix' ? 'text-secondary' : 'text-rose-500'}`} />
                        </div>
                      </div>
                      <h3 className="font-semibold tracking-tight text-xl text-text-dark dark:text-text-light">
                        {/* FIX: Cast dynamic translation lookup to string to resolve type error. */}
                        {t[tool.nameKey as keyof typeof t] as string}
                      </h3>
                    </div>
                    <div className="p-6 pt-0 flex flex-col flex-grow">
                      <p className="text-center text-text-dark/70 dark:text-text-light/70 mb-6 leading-relaxed flex-grow">
                        {/* FIX: Cast dynamic translation lookup to string to resolve type error. */}
                        {t[tool.descKey as keyof typeof t] as string}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </main>
  );
}