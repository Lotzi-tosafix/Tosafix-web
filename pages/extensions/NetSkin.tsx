

import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

const DesignsGallerySection = () => {
    const { language } = useLanguage();
    const t = translations[language];
  
    const designs = [
      { src: "https://files.cdn-files-a.com/uploads/10483955/2000_68ab2850433fd.png", alt: "Design 1" },
      { src: "https://files.cdn-files-a.com/uploads/10483955/2000_68ab2881e6270.png", alt: "Design 2" },
      { src: "https://files.cdn-files-a.com/uploads/10483955/2000_68ab28a6ae2b0.png", alt: "Design 3" },
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              <span className="bg-gradient-to-l from-green-600 to-emerald-800 bg-clip-text text-transparent">
                {t.netSkinGalleryTitle}
              </span>
            </h2>
            <p className="text-lg text-slate-600">{t.netSkinGalleryDesc}</p>
          </motion.div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="p-0">
                    <img src={design.src} alt={design.alt} className="w-full h-48 object-cover" />
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
      image: 'https://images.cdn-files-a.com/ready_uploads/media/145266/400_5ce9f80c55e42.jpg'
    },
    {
      title: t.netSkinFeature2Title,
      description: t.netSkinFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/3558404/400_5f14a4d8dc3b4.jpg'
    },
    {
      title: t.netSkinFeature3Title,
      description: t.netSkinFeature3Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/11718969/400_6453bc0c1fb52.jpg'
    },
    {
      title: t.netSkinFeature4Title,
      description: t.netSkinFeature4Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/9488413/400_637d82df6d944.jpg'
    },
    {
        title: t.netSkinFeature5Title,
        description: t.netSkinFeature5Desc,
        image: 'https://files.cdn-files-a.com/ready_uploads/media/14878221/400_671a6ace1f64c.jpg'
    },
    {
        title: t.netSkinFeature6Title,
        description: t.netSkinFeature6Desc,
        image: 'https://images.cdn-files-a.com/ready_uploads/media/24147/400_5cdcf4dfcd425.jpg'
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
