

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function ExtensionsGrid() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];

  const extensionList = [
    { nameKey: 'notiForumGridName', descKey: 'notiForumGridDesc', path: '/extensions/notiforum', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e410c38cc1d.png', gradient: 'from-[#5FB8D6] to-[#5B72E8]' },
    { nameKey: 'yaminaName', descKey: 'yaminaGridDesc', path: '/extensions/yamina', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png', gradient: 'from-[#9B7FD9] to-[#5FB8D6]' },
    { nameKey: 'netSkinName', descKey: 'netSkinGridDesc', path: '/extensions/netskin', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png', gradient: 'from-[#5B72E8] to-[#9B7FD9]' },
    { nameKey: 'hebrewDateName', descKey: 'hebrewDateGridDesc', path: '/extensions/hebrewdate', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png', gradient: 'from-[#5FB8D6] to-[#9B7FD9]' },
    { nameKey: 'myEmojiName', descKey: 'myEmojiGridDesc', path: '/extensions/myemoji', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png', gradient: 'from-[#9B7FD9] to-[#5B72E8]' },
    { nameKey: 'edgeOpenerName', descKey: 'edgeOpenerGridDesc', path: '/extensions/edgeopener', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png', gradient: 'from-[#5B72E8] to-[#5FB8D6]' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const ArrowIcon = isHebrew ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 bg-white dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light font-assistant">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.ourExtensions}
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-400">{t.ourExtensionsDesc}</p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {extensionList.map((ext) => (
            <motion.div key={ext.nameKey} variants={itemVariants} className="flex">
              <div className="rounded-lg w-full flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${ext.gradient} p-4 mb-4 mx-auto`}>
                    <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t]} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-semibold tracking-tight text-center text-xl text-text-dark dark:text-text-light font-assistant">
                    {t[ext.nameKey as keyof typeof t]}
                  </h3>
                </div>
                <div className="p-6 pt-0 flex flex-col flex-grow">
                  <p className="text-center text-gray-700/80 dark:text-gray-300 mb-6 leading-relaxed flex-grow min-h-[7em]">
                    {t[ext.descKey as keyof typeof t]}
                  </p>
                  <Link to={ext.path} className="mt-auto">
                    <button className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 py-2 rounded-md text-sm font-medium text-text-light bg-gradient-to-r from-[#5FB8D6] to-[#5B72E8] hover:brightness-110 transition-all duration-300 font-assistant">
                        {t.readMore}
                        <ArrowIcon className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}