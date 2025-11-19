import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

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
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e40b3ab8d19.jpg'
    },
    {
      title: t.yaminaFeature2Title,
      description: t.yaminaFeature2Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e40bb9d4b7e.jpg'
    },
    {
      title: t.yaminaFeature3Title,
      description: t.yaminaFeature3Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e40c208be83_filter_67e40c4fe69a2.jpg'
    },
    {
      title: t.yaminaFeature4Title,
      description: t.yaminaFeature4Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e40cf88afac.jpg'
    },
    {
      title: t.yaminaFeature5Title,
      description: t.yaminaFeature5Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e40d9cea5fd.jpg'
    },
    {
      title: t.yaminaFeature6Title,
      description: t.yaminaFeature6Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e40e0287f23.jpg'
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