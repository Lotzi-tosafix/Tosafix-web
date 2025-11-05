
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
    { nameKey: 'notiForumName', descKey: 'notiForumDesc', path: '/extensions/notiforum', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e410c38cc1d.png', gradient: 'from-primary to-secondary' },
    { nameKey: 'yaminaName', descKey: 'yaminaDesc', path: '/extensions/yamina', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png', gradient: 'from-secondary to-accent' },
    { nameKey: 'netSkinName', descKey: 'netSkinDesc', path: '/extensions/netskin', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png', gradient: 'from-accent to-primary' },
    { nameKey: 'hebrewDateName', descKey: 'hebrewDateDesc', path: '/extensions/hebrewdate', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png', gradient: 'from-primary to-accent' },
    { nameKey: 'myEmojiName', descKey: 'myEmojiDesc', path: '/extensions/myemoji', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png', gradient: 'from-secondary to-primary' },
    { nameKey: 'edgeOpenerName', descKey: 'edgeOpenerDesc', path: '/extensions/edgeopener', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png', gradient: 'from-accent to-secondary' },
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl text-text-dark sm:text-4xl font-assistant font-bold">{t.ourExtensions}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">{t.ourExtensionsDesc}</p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {extensionList.map((ext) => (
            <motion.div key={ext.nameKey} variants={itemVariants}>
              <Link to={ext.path} className="block group">
                <div className="h-full bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform group-hover:-translate-y-2">
                  <div className={`p-6 bg-gradient-to-br ${ext.gradient}`}>
                    <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t]} className="h-16 w-16 mx-auto rounded-lg shadow-md" />
                    <h3 className="mt-4 text-2xl font-bold text-text-light text-center font-assistant">{t[ext.nameKey as keyof typeof t]}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-center min-h-[3em]">{t[ext.descKey as keyof typeof t]}</p>
                    <div className="mt-6 text-center">
                        <span className="inline-flex items-center text-primary font-semibold group-hover:brightness-90 transition-all duration-300 font-assistant">
                            {t.readMore}
                            <ArrowIcon className="ms-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
