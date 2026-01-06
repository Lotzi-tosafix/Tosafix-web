
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
      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-block p-3 rounded-full glass-card mb-4 border border-white/30 dark:border-white/10">
                 <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.privacyPageTitle}</span>
            </h1>
            <div className="inline-block glass-card p-2 px-4 rounded-xl shadow-sm border border-white/40">
                <p className="text-sm text-text-dark/70 dark:text-text-light/70 font-light">{t.privacyPageLastUpdated}: {new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/40 dark:border-white/10"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none prose-sm md:prose-base">
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
