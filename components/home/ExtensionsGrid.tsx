
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function ExtensionsGrid() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];

  const extensionList = [
    { nameKey: 'notiForumName', descKey: 'notiForumGridDesc', path: '/extensions/notiforum', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png', gradient: 'from-primary to-secondary' },
    { nameKey: 'yaminaName', descKey: 'yaminaGridDesc', path: '/extensions/yamina', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png', gradient: 'from-secondary to-accent' },
    { nameKey: 'gfdName', descKey: 'gfdGridDesc', path: '/extensions/gfd', icon: 'https://lh3.googleusercontent.com/r77r2zRyYLfTAWvBLy1zELxTgpCpRziU48cfEexOCC31KvdnettoQ1U58Amvgj6kCErQjX2GGIwe6DYV9SBAG-J03w=s120', gradient: 'from-blue-600 to-indigo-600' },
    { nameKey: 'netSkinName', descKey: 'netSkinGridDesc', path: '/extensions/netskin', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png', gradient: 'from-accent to-primary' },
    { nameKey: 'hebrewDateName', descKey: 'hebrewDateGridDesc', path: '/extensions/hebrewdate', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png', gradient: 'from-primary to-secondary' },
    { nameKey: 'myEmojiName', descKey: 'myEmojiGridDesc', path: '/extensions/myemoji', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png', gradient: 'from-secondary to-accent' },
    { nameKey: 'edgeOpenerName', descKey: 'edgeOpenerGridDesc', path: '/extensions/edgeopener', icon: 'https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png', gradient: 'from-accent to-primary' },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'spring', bounce: 0.3 } }
  };

  return (
    <section id="extensions-grid" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-1.5 rounded-full bg-white/20 dark:bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
             <span className="px-5 py-1.5 rounded-full bg-white/50 dark:bg-white/10 text-sm font-bold text-primary uppercase tracking-wider shadow-sm">{t.extensions}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-text-dark dark:text-text-light font-rubik tracking-tight">
            {t.ourExtensions}
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-text-dark/70 dark:text-text-light/70 leading-relaxed font-light">
            {t.ourExtensionsDesc}
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {extensionList.map((ext) => (
            <motion.div key={ext.nameKey} variants={itemVariants} className="h-full">
              <Link to={ext.path} className="group relative block h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${ext.gradient} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10`}></div>
                <div className="relative h-full glass-card rounded-[2rem] p-8 transition-all duration-500 group-hover:-translate-y-2 border border-white/50 dark:border-white/10 flex flex-col overflow-hidden">
                    
                    {/* Decorative Circle */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                    {/* Icon Container */}
                    <div className="mb-8 relative">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${ext.gradient} p-[2px] shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                             <div className="w-full h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-[14px] flex items-center justify-center">
                                 <img src={ext.icon} alt={t[ext.nameKey as keyof typeof t] as string} className="w-12 h-12 object-contain drop-shadow-md" />
                             </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-text-dark dark:text-text-light group-hover:text-primary transition-colors font-rubik">
                        {t[ext.nameKey as keyof typeof t] as string}
                    </h3>
                    
                    <p className="text-text-dark/70 dark:text-text-light/70 mb-8 leading-relaxed flex-grow font-light">
                        {t[ext.descKey as keyof typeof t] as string}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all mt-auto">
                        <span className="relative">
                            {t.readMore}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <ArrowRight size={18} className="rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
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
