
import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for NetSkin ---

const PaletteIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M85 50 C85 70 70 85 50 85 C30 85 15 70 15 50 C15 30 30 15 50 15 C65 15 85 25 85 50" fill="#F1F5F9" stroke="#3B82F6" strokeWidth="2" />
    <circle cx="35" cy="40" r="6" fill="#EF4444" />
    <circle cx="50" cy="30" r="6" fill="#F59E0B" />
    <circle cx="65" cy="40" r="6" fill="#10B981" />
    <circle cx="70" cy="60" r="6" fill="#8B5CF6" />
    <circle cx="45" cy="70" r="8" fill="#3B82F6" opacity="0.4" />
  </svg>
);

const UserSettingsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="40" r="15" fill="#3B82F6" />
    <path d="M25 80 C25 65 35 55 50 55 C65 55 75 65 75 80" fill="#3B82F6" />
    <path d="M70 20 L85 35" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
    <path d="M80 15 L95 30" stroke="#F59E0B" strokeWidth="2" opacity="0.5" />
  </svg>
);

const SmartDetectionIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="25" y="25" width="50" height="50" rx="8" fill="#E2E8F0" />
    <circle cx="55" cy="45" r="15" stroke="#3B82F6" strokeWidth="4" fill="white" />
    <path d="M65 55 L80 70" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
    <path d="M35 35 H45" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const RandomModeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="60" height="60" rx="12" fill="#8B5CF6" />
    <circle cx="35" cy="35" r="5" fill="white" />
    <circle cx="65" cy="65" r="5" fill="white" />
    <circle cx="50" cy="50" r="5" fill="white" />
    <circle cx="65" cy="35" r="5" fill="white" />
    <circle cx="35" cy="65" r="5" fill="white" />
  </svg>
);

const InstallIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M30 75 H70 V35 H55 L50 25 L45 35 H30 Z" fill="#10B981" opacity="0.2" />
    <path d="M50 20 V60 M35 45 L50 60 L65 45" stroke="#10B981" strokeWidth="6" fill="none" strokeLinecap="round" strokeJoin="round" />
    <rect x="20" y="70" width="60" height="10" rx="5" fill="#10B981" />
  </svg>
);

const CloudLightIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M25 65 Q15 65 15 55 Q15 45 30 45 Q35 25 55 25 Q75 25 75 45 Q85 45 85 55 Q85 65 75 65 Z" fill="#79C9E8" opacity="0.6" />
    <path d="M40 75 L60 75" stroke="#79C9E8" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
  </svg>
);

const DesignsGallerySection = () => {
    const { language } = useLanguage();
    const t = translations[language];
  
    const designs = [
      { src: "https://files.cdn-files-a.com/uploads/10483955/2000_68ab2850433fd.png", alt: "Design 1" },
      { src: "https://files.cdn-files-a.com/uploads/10483955/2000_68ab2881e6270.png", alt: "Design 2" },
      { src: "https://files.cdn-files-a.com/uploads/10483955/2000_68ab28a6ae2b0.png", alt: "Design 3" },
    ];
  
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
              <span className="bg-gradient-to-l from-green-600 to-emerald-800 bg-clip-text text-transparent">
                {t.netSkinGalleryTitle}
              </span>
            </h2>
            <p className="text-lg text-text-dark/60 dark:text-text-light/60">{t.netSkinGalleryDesc}</p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 glass-card p-2">
                  <div className="p-0 rounded-2xl overflow-hidden">
                    <img src={design.src} alt={design.alt} className="w-full h-56 object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default function NetSkin() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.netSkinFeature1Title,
      description: t.netSkinFeature1Desc,
      icon: PaletteIcon
    },
    {
      title: t.netSkinFeature2Title,
      description: t.netSkinFeature2Desc,
      icon: UserSettingsIcon
    },
    {
      title: t.netSkinFeature3Title,
      description: t.netSkinFeature3Desc,
      icon: SmartDetectionIcon
    },
    {
      title: t.netSkinFeature4Title,
      description: t.netSkinFeature4Desc,
      icon: RandomModeIcon
    },
    {
        title: t.netSkinFeature5Title,
        description: t.netSkinFeature5Desc,
        icon: InstallIcon
    },
    {
        title: t.netSkinFeature6Title,
        description: t.netSkinFeature6Desc,
        icon: CloudLightIcon
    }
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome.' : 'Download from the Chrome Web Store.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/netskin/kkpdhfojmlegbgddnigfehpmnjogaail',
  };

  return (
    <ExtensionLayout
      name={t.netSkinName}
      description={t.netSkinDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png"
      features={features}
      installSection={installSection}
      privacyPolicyContent={t.netSkinPrivacyPolicy}
    >
        <DesignsGallerySection />
    </ExtensionLayout>
  );
}
