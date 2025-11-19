
import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function Privacy() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="flex-1">
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-4 rounded-full glass-card mb-6 border border-white/30 dark:border-white/10">
                 <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light mb-6 font-rubik">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.privacyPageTitle}</span>
            </h1>
            <p className="text-xl text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto leading-relaxed font-light glass-card p-4 rounded-2xl inline-block">{t.privacyPageLastUpdated}: {new Date().toLocaleDateString()}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/40 dark:border-white/10"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{t.privacyIntro}</p>

              <h3>{t.privacyCollectionTitle}</h3>
              <p>{t.privacyCollectionDesc}</p>
              
              <h3>{t.privacyUsageTitle}</h3>
              <p>{t.privacyUsageDesc}</p>

              <h3>{t.privacyCookiesTitle}</h3>
              <p>{t.privacyCookiesDesc}</p>

              <h3>{t.privacyThirdPartyTitle}</h3>
              <p>{t.privacyThirdPartyDesc}</p>

              <h3>{t.privacyHostingTitle}</h3>
              <p>{t.privacyHostingDesc}</p>

              <h3>{t.privacyContactTitle}</h3>
              <p>{t.privacyContactDesc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
