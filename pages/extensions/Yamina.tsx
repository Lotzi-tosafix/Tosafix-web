
import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for Yamina ---

const AutoAlignIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="25" width="60" height="4" rx="2" fill="#CBD5E1" />
    <rect x="40" y="35" width="40" height="4" rx="2" fill="#3B82F6" />
    <rect x="30" y="45" width="50" height="4" rx="2" fill="#3B82F6" />
    <rect x="50" y="55" width="30" height="4" rx="2" fill="#3B82F6" />
    <path d="M15 35 L25 45 L15 55" stroke="#3B82F6" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

const SiteSupportIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="20" width="70" height="60" rx="8" fill="#E2E8F0" opacity="0.3" />
    <rect x="15" y="20" width="70" height="15" rx="8" fill="#3B82F6" />
    <circle cx="25" cy="27.5" r="3" fill="white" />
    <circle cx="35" cy="27.5" r="3" fill="white" />
    <path d="M40 55 L48 63 L65 45" stroke="#10B981" strokeWidth="6" fill="none" strokeLinecap="round" />
  </svg>
);

const EasyToUseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="30" fill="#F59E0B" opacity="0.1" />
    <path d="M40 70 L60 30" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 40 Q75 40 75 25" stroke="#F59E0B" strokeWidth="3" fill="none" />
    <circle cx="75" cy="25" r="4" fill="#F59E0B" />
    <path d="M40 70 L30 80" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const PerfBoltIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M55 15 L30 55 H50 L45 85 L70 45 H50 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
  </svg>
);

const ConfigListIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="25" y="25" width="50" height="50" rx="10" fill="#E2E8F0" />
    <circle cx="40" cy="40" r="5" fill="#3B82F6" />
    <rect x="52" y="38" width="15" height="4" rx="2" fill="#94A3B8" />
    <circle cx="40" cy="55" r="5" fill="#8B5CF6" />
    <rect x="52" y="53" width="15" height="4" rx="2" fill="#94A3B8" />
  </svg>
);

const OpenSourceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M30 40 L15 50 L30 60" stroke="#334155" strokeWidth="6" fill="none" strokeLinecap="round" strokeJoin="round" />
    <path d="M70 40 L85 50 L70 60" stroke="#334155" strokeWidth="6" fill="none" strokeLinecap="round" strokeJoin="round" />
    <path d="M55 25 L45 75" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const YaminaHowItWorksSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
                        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">
                            {t.yaminaHowItWorksTitle}
                        </span>
                    </h2>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="glass-card p-4 rounded-3xl"
                    >
                        <img src="https://files.cdn-files-a.com/uploads/10483955/800_67e40a03f03a0.png" alt="Yamina - Before" className="w-full rounded-2xl shadow-xl" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="glass-card p-4 rounded-3xl"
                    >
                        <img src="https://files.cdn-files-a.com/uploads/10483955/800_67e409f0a1eaa.png" alt="Yamina - After" className="w-full rounded-2xl shadow-xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


export default function Yamina() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.yaminaFeature1Title,
      description: t.yaminaFeature1Desc,
      icon: AutoAlignIcon
    },
    {
      title: t.yaminaFeature2Title,
      description: t.yaminaFeature2Desc,
      icon: SiteSupportIcon
    },
    {
      title: t.yaminaFeature3Title,
      description: t.yaminaFeature3Desc,
      icon: EasyToUseIcon
    },
    {
      title: t.yaminaFeature4Title,
      description: t.yaminaFeature4Desc,
      icon: PerfBoltIcon
    },
    {
      title: t.yaminaFeature5Title,
      description: t.yaminaFeature5Desc,
      icon: ConfigListIcon
    },
    {
      title: t.yaminaFeature6Title,
      description: t.yaminaFeature6Desc,
      icon: OpenSourceIcon
    }
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome.' : 'Download from the Chrome Web Store.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/ימינה/llijnocckifjnjnjkndeabebncjgnlmi?utm_source=ext_app_menu',
  };

  return (
    <ExtensionLayout
      name={t.yaminaName}
      description={t.yaminaDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png"
      features={features}
      installSection={installSection}
      privacyPolicyContent={t.yaminaPrivacyPolicy}
      beforeFeaturesContent={<YaminaHowItWorksSection />}
    />
  );
}
