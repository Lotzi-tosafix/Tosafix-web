import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { Gift, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

const MyEmojiBonusSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-bg-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        <span className="bg-gradient-to-l from-rose-600 to-pink-800 bg-clip-text text-transparent flex items-center justify-center gap-3">
                            <Gift className="w-8 h-8 text-rose-600" />
                            {t.myEmojiBonusSectionTitle}
                        </span>
                    </h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-l from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-rose-200 dark:border-rose-900/50 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col space-y-1.5 p-6 text-center">
                            <h3 className="font-semibold tracking-tight text-2xl text-slate-900 dark:text-slate-100 mb-2">{t.myEmojiBonusCardTitle}</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                                {t.myEmojiBonusCardDesc}
                                <br />
                                <span className="text-sm mt-2 block">
                                    <strong>{t.myEmojiBonusCardCredit.split(':')[0]}:</strong>
                                    {t.myEmojiBonusCardCredit.split(':')[1]}
                                    <a href="https://www.prog.co.il/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline ms-1">
                                        https://www.prog.co.il/
                                    </a>
                                </span>
                            </p>
                        </div>
                        <div className="p-6 pt-0 text-center">
                            <a 
                                href="https://67d80604326ae.site123.me/versions/2/wizard/modules/fileManager/downloadDigitalFile.php?url=https%3A%2F%2Ffiles.cdn-files-a.com%2Fuploads%2F10483955%2Fsecure%2Fnormal_6814b05f6be2e.zip" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-11 bg-gradient-to-l from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                <Download className="w-5 h-5 me-2" />
                                {t.myEmojiBonusDownloadBtn}
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default function MyEmoji() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.myEmojiFeature1Title,
      description: t.myEmojiFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/3944257/400_5e481d3ca13a1.jpg'
    },
    {
      title: t.myEmojiFeature2Title,
      description: t.myEmojiFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/2965634/400_5e0f478d8e5b0.jpg'
    },
    {
      title: t.myEmojiFeature3Title,
      description: t.myEmojiFeature3Desc,
      image: 'https://files.cdn-files-a.com/ready_uploads/media/15477185/400_67f733b9da5f3.jpg'
    },
    {
      title: t.myEmojiFeature4Title,
      description: t.myEmojiFeature4Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_un-6810d39a719c0.jpg'
    },
    {
      title: t.myEmojiFeature5Title,
      description: t.myEmojiFeature5Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/12831207/400_6516f04acde8b.jpg'
    },
    {
      title: t.myEmojiFeature6Title,
      description: t.myEmojiFeature6Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/8467866/400_60740586057e0.jpg'
    }
  ];

  const installSection = {
    description: t.notiInstallDesc,
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/haipomfdalnimjgfkkmoekednmlgcieh?utm_source=item-share-cb',
  };

  return (
    <ExtensionLayout
      name={t.myEmojiName}
      description={t.myEmojiDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_6810cd042475f.png"
      features={features}
      installSection={installSection}
      privacyPolicyContent={t.myEmojiPrivacyPolicy}
    >
      <MyEmojiBonusSection />
    </ExtensionLayout>
  );
}