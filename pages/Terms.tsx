
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

export default function Terms() {
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
                 <FileText className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">{t.termsPageTitle}</span>
            </h1>
            <div className="inline-block glass-card p-2 px-4 rounded-xl shadow-sm border border-white/40">
                <p className="text-sm text-text-dark/70 dark:text-text-light/70 font-light">{t.termsPageLastUpdated}: {new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-white/40 dark:border-white/10"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none prose-sm md:prose-base">
              <h3>1. {t.termsAcceptanceTitle}</h3>
              <p>{t.termsAcceptanceDesc}</p>

              <h3>2. {t.termsLicenseTitle}</h3>
              <p>{t.termsLicenseDesc}</p>

              <h3>3. {t.termsDisclaimerTitle}</h3>
              <p>{t.termsDisclaimerDesc}</p>

              <h3>4. {t.termsLimitationsTitle}</h3>
              <p>{t.termsLimitationsDesc}</p>

              <h3>5. {t.termsLinksTitle}</h3>
              <p>{t.termsLinksDesc}</p>

              <h3>6. {t.termsModificationsTitle}</h3>
              <p>{t.termsModificationsDesc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
