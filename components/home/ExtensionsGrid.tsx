import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function ExtensionsGrid() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];

  const extensionList = [
    { nameKey: 'notiForumName', descKey: 'notiForumGridDesc', path: '/extensions/notiforum', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png', gradient: 'from-primary to-secondary' },
    { nameKey: 'yaminaName', descKey: 'yaminaGridDesc', path: '/extensions/yamina', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png', gradient: 'from-secondary to-accent' },
    { nameKey: 'netSkinName', descKey: 'netSkinGridDesc', path: '/extensions/netskin', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png', gradient: 'from-accent to-primary' },
    { nameKey: 'hebrewDateName', descKey: 'hebrewDateGridDesc', path: '/extensions/hebrewdate', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png', gradient: 'from-primary to-secondary' },
    { nameKey: 'myEmojiName', descKey: 'myEmojiGridDesc', path: '/extensions/myemoji', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png', gradient: 'from-secondary to-accent' },
    { nameKey: 'edgeOpenerName', descKey: 'edgeOpenerGridDesc', path: '/extensions/edgeopener', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png', gradient: 'from-accent to-primary' },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="extensions-grid" className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.ourExtensions}
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-text-dark/70 dark:text-text-light/70">{t.ourExtensionsDesc}</p>
        </motion.div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {extensionList.map((ext) => (
            <motion.div key={ext.nameKey} variants={itemVariants} className="flex">
              <Link to={ext.path} className="flex flex-col w-full rounded-xl shadow h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-800 border border-primary/20 dark:border-secondary/20 cursor-pointer">
                <div className="p-6 text-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${ext.gradient} mb-4 mx-auto flex items-center justify-center`}>
                    <div className="w-16 h-16 bg-white/80 dark:bg-white/20 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm">
                        {/* FIX: Cast dynamic translation lookup to string to resolve type error for 'alt' attribute. */}
                        <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t] as string} className="w-12 h-12 object-contain" />
                    </div>
                  </div>
                  <h3 className="font-semibold tracking-tight text-xl text-text-dark dark:text-text-light">
                    {/* FIX: Cast dynamic translation lookup to string to resolve type error. */}
                    {t[ext.nameKey as keyof typeof t] as string}
                  </h3>
                </div>
                <div className="p-6 pt-0 flex flex-col flex-grow">
                  <p className="text-center text-text-dark/70 dark:text-text-light/70 mb-6 leading-relaxed flex-grow">
                    {/* FIX: Cast dynamic translation lookup to string to resolve type error. */}
                    {t[ext.descKey as keyof typeof t] as string}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}