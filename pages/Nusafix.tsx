

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Music, Activity, QrCode } from 'lucide-react';
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
  },
  {
    nameKey: 'fixChecker',
    descKey: 'fixCheckerDescription',
    path: '/nosafix/fix-checker',
    icon: Activity,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    nameKey: 'qrFix',
    descKey: 'qrFixDescription',
    path: '/nosafix/qr-fix',
    icon: QrCode,
    gradient: 'from-violet-500 to-purple-600'
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
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light mb-6 font-rubik">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{t.nosafix}</span>
            </h1>
            <p className="text-xl text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto leading-relaxed font-light glass-card p-6 rounded-2xl">{t.nosafixTitle}</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
          >
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isCutfix = tool.nameKey === 'cutfix';
              const isMusic = tool.nameKey === 'liveMusic';
              const isQr = tool.nameKey === 'qrFix';
              
              const iconColor = isCutfix ? 'text-secondary' : isMusic ? 'text-rose-500' : isQr ? 'text-violet-500' : 'text-blue-500';

              return (
                <motion.div key={tool.nameKey} variants={itemVariants} className="flex">
                  <Link to={tool.path} className="flex flex-col w-full rounded-[2rem] glass-card hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group border border-white/40 dark:border-white/10">
                    <div className="p-10 text-center flex-grow flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${tool.gradient} mb-8 flex items-center justify-center p-[2px] shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <div className="w-full h-full bg-white/90 dark:bg-gray-900/90 rounded-[22px] flex items-center justify-center shadow-inner backdrop-blur-xl">
                          <Icon className={`w-12 h-12 object-contain ${iconColor}`} />
                        </div>
                      </div>
                      <h3 className="font-bold tracking-tight text-3xl text-text-dark dark:text-text-light mb-4 font-rubik">
                        {t[tool.nameKey as keyof typeof t] as string}
                      </h3>
                      <p className="text-text-dark/70 dark:text-text-light/70 leading-relaxed font-light">
                        {t[tool.descKey as keyof typeof t] as string}
                      </p>
                    </div>
                     <div className="bg-white/40 dark:bg-white/5 py-4 text-center text-sm font-bold text-primary uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-colors duration-300 backdrop-blur-md">
                         {t.openTool}
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