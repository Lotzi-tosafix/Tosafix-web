import React from 'react';
// FIX: Import Variants type from framer-motion to explicitly type animation variants.
import { motion, Variants } from 'framer-motion';
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
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  // FIX: Explicitly type with Variants to satisfy TypeScript's strict type checking for the 'ease' property.
  const textVariants: Variants = {
     hidden: { x: -50, opacity: 0 },
     visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
  }
  
  // FIX: Explicitly type with Variants to satisfy TypeScript's strict type checking for the 'ease' property.
   const gridVariants: Variants = {
     hidden: { x: 50, opacity: 0 },
     visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(white 0%, #F6F9FC 100%)' }}>
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://files.cdn-files-a.com/uploads/10483955/2000_gi-67e460ced9bad.jpg')" }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-dark dark:text-text-light">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.aboutTitle}</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-text-dark/80 dark:text-text-light/80">
              {t.aboutText}
            </p>
            <div className="flex items-center gap-4">
              <div className="text-center p-4 rounded-xl bg-gradient-to-r from-primary to-secondary">
                <div className="text-3xl font-bold text-white">6+</div>
                <div className="text-sm text-white/90">{t.activeExtensions}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants} className="p-6 bg-white/90 dark:bg-bg-dark/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-primary/20">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r from-primary to-secondary">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-dark dark:text-text-light">{feature.title}</h3>
                  <p className="text-sm text-text-dark/70 dark:text-text-light/70">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}