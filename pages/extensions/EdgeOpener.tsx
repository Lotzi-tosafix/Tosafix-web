import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

const EdgeOpenerHowItWorksSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        <span className="bg-gradient-to-l from-indigo-600 to-blue-800 bg-clip-text text-transparent">
                            {t.edgeOpenerHowItWorksTitle}
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600">{t.edgeOpenerHowItWorksDesc}</p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <img src="https://images.cdn-files-a.com/ready_uploads/media/182116/2000_5cebd6d2d1a23.jpg" alt="Open in Edge" className="w-full rounded-xl shadow-2xl" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <img src="https://images.cdn-files-a.com/ready_uploads/media/6996573/2000_5f97d168e9038.jpg" alt="Extension Interface" className="w-full rounded-xl shadow-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default function EdgeOpener() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.edgeOpenerFeature1Title,
      description: t.edgeOpenerFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/24147/400_5cdcf4dfcd425.jpg'
    },
    {
      title: t.edgeOpenerFeature2Title,
      description: t.edgeOpenerFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/5878/400_5cda5ef11db09.jpg'
    },
    {
      title: t.edgeOpenerFeature3Title,
      description: t.edgeOpenerFeature3Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/5156821/400_5ebbf38903ef2.jpg'
    }
  ];

  const installSection = {
    description: t.notiInstallDesc,
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/lapacahlnhgpkkjjpfcfklopgcdaedhh?utm_source=item-share-cb',
  };

  return (
    <ExtensionLayout
      name={t.edgeOpenerName}
      description={t.edgeOpenerDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png"
      features={features}
      installSection={installSection}
      privacyPolicyContent={t.edgeOpenerPrivacyPolicy}
      beforeFeaturesContent={<EdgeOpenerHowItWorksSection />}
    />
  );
}