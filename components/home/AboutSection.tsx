import React from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function AboutSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    { icon: Users, title: t.userFocused, description: t.userFocusedDesc },
    { icon: Clock, title: t.timeSaving, description: t.timeSavingDesc },
    { icon: Shield, title: t.secureReliable, description: t.secureReliableDesc },
    { icon: Zap, title: t.easyToUse, description: t.easyToUseDesc }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="about" className="py-20 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-3xl text-text-dark dark:text-text-light sm:text-4xl font-assistant font-bold"
          >
            {t.aboutTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400"
          >
            {t.aboutText}
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary text-text-light mx-auto">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-lg font-semibold font-assistant text-text-dark dark:text-text-light">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}