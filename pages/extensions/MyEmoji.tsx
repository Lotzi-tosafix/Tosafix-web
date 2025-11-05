import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { Gift } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function MyEmoji() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.myEmojiFeature1,
      description: t.myEmojiFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/3944257/400_5e481d3ca13a1.jpg'
    },
    {
      title: t.myEmojiFeature2,
      description: t.myEmojiFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/2965634/400_5e0f478d8e5b0.jpg'
    },
    {
      title: t.myEmojiFeature3,
      description: t.myEmojiFeature3Desc,
      image: 'https://files.cdn-files-a.com/ready_uploads/media/15477185/400_67f733b9da5f3.jpg'
    },
    {
      title: t.myEmojiFeature4,
      description: t.myEmojiFeature4Desc,
      image: 'https://picsum.photos/seed/myemoji4/800/600'
    },
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome. להתקנה ידנית, יש לחלץ את התיקייה ולטעון אותה באופן ידני.' : 'Download from the Chrome Web Store. For manual installation, extract the folder and load it manually.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/my-emoji/eokagfilfhhdebeebphdeaejfnkfkdco?utm_source=item-share-cb',
    downloadUrl: 'https://www.googleapis.com/drive/v3/files/1Xq1q1Q1Q1q1Q1q1Q1q1Q1q1Q1q1Q1q1Q?alt=media&key=AIzaSyDduW1Zbi2MIu8aMUMF6op72pJ1f0sPBi0' // Fictional URL
  };

  return (
    <ExtensionLayout
      name={t.myEmojiName}
      description={t.myEmojiDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png"
      features={features}
      installSection={installSection}
      privacyPolicyUrl="#"
    >
      <BonusSection />
    </ExtensionLayout>
  );
}

const BonusSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-r from-accent to-secondary p-8 md:p-12 rounded-2xl shadow-xl text-text-light text-center"
                >
                    <div className="inline-block p-4 bg-white/20 rounded-full mb-4">
                        <Gift className="h-10 w-10 text-text-light" />
                    </div>
                    <h3 className="text-3xl font-bold font-assistant">{t.myEmojiBonus}</h3>
                    <p className="mt-2 text-lg">{t.myEmojiBonusDesc}</p>
                </motion.div>
            </div>
        </section>
    );
};