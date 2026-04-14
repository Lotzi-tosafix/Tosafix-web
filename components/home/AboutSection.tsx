import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Users, Clock, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function AboutSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [totalUsers, setTotalUsers] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const extensionIds = [
        'hgceibdlnoiclpkmgccijjgdkocflkfj', // Noti
        'pbmkhndepaehcbajogcbdfghmkeepphn', // NodeBB Plus
        'llijnocckifjnjnjkndeabebncjgnlmi', // Yamina
        'apiieghcagbhlodhfijaepgaonmflhhp', // GFD
        'kkpdhfojmlegbgddnigfehpmnjogaail', // NetSkin
        'hbpdljfncgnolomebnkannnaijhndamm', // Hebrew Date
        'haipomfdalnimjgfkkmoekednmlgcieh', // MyEmoji
        'lapacahlnhgpkkjjpfcfklopgcdaedhh', // Edge Opener
      ];

      let sum = 0;
      await Promise.all(
        extensionIds.map(async (id) => {
          try {
            const res = await fetch(`/api/chrome-store?id=${id}`);
            if (res.ok) {
              const data = await res.json();
              if (data.users) {
                const numStr = data.users.replace(/[^0-9]/g, '');
                if (numStr) {
                  sum += parseInt(numStr, 10);
                }
              }
            }
          } catch (error) {
            console.error(`Failed to fetch stats for ${id}:`, error);
          }
        })
      );
      if (sum > 0) {
        setTotalUsers(sum);
      }
    };

    fetchTotalUsers();
  }, []);

  const features = [
    { icon: Users, title: t.userFocused, description: t.userFocusedDesc, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Clock, title: t.timeSaving, description: t.timeSavingDesc, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: Shield, title: t.secureReliable, description: t.secureReliableDesc, color: 'text-green-500', bg: 'bg-green-500/10' },
    { icon: Zap, title: t.easyToUse, description: t.easyToUseDesc, color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
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
  
  const textVariants: Variants = {
     hidden: { x: -50, opacity: 0 },
     visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
  }
  
   const gridVariants: Variants = {
     hidden: { x: 50, opacity: 0 },
     visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } }
  }

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-text-dark dark:text-text-light font-rubik">
              {t.aboutTitle}
            </h2>
            <p className="text-xl leading-relaxed mb-10 text-text-dark/80 dark:text-text-light/80 font-light glass-card p-6 rounded-2xl border-l-4 border-primary/50">
              {t.aboutText}
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
                <div className="inline-flex items-center gap-4 p-2 pr-6 rounded-full glass border border-white/40">
                   <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                       8+
                   </div>
                   <div className="flex flex-col">
                       <span className="text-lg font-bold text-text-dark dark:text-text-light">{t.activeExtensions}</span>
                       <span className="text-sm text-text-dark/60 dark:text-text-light/60">Chrome Web Store</span>
                   </div>
                </div>

                {totalUsers && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-4 p-2 pr-6 rounded-full glass border border-white/40"
                    >
                       <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                           {totalUsers >= 1000 ? `${(totalUsers / 1000).toFixed(1).replace('.0', '')}K+` : `${totalUsers}+`}
                       </div>
                       <div className="flex flex-col">
                           <span className="text-lg font-bold text-text-dark dark:text-text-light">{t.satisfiedUsers}</span>
                           <span className="text-sm text-text-dark/60 dark:text-text-light/60">Chrome Web Store</span>
                       </div>
                    </motion.div>
                )}
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
              {features.map((feature, idx) => (
                <motion.div 
                    key={feature.title} 
                    variants={itemVariants} 
                    className={`glass-card p-6 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/40 dark:border-white/10 ${idx % 2 === 1 ? 'mt-0 sm:mt-8' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${feature.bg} backdrop-blur-sm`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-dark dark:text-text-light">{feature.title}</h3>
                  <p className="text-sm text-text-dark/70 dark:text-text-light/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}