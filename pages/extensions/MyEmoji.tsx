
import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { Gift, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for My Emoji ---

const HappyPhotoIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="60" height="60" rx="8" fill="#FDE047" opacity="0.3" />
    <circle cx="50" cy="45" r="15" fill="#FDE047" />
    <circle cx="43" cy="42" r="2" fill="#854D0E" />
    <circle cx="57" cy="42" r="2" fill="#854D0E" />
    <path d="M43 52 Q50 58 57 52" stroke="#854D0E" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30 75 L45 60 L55 70 L70 55 L80 75" fill="none" stroke="#A855F7" strokeWidth="4" strokeLinecap="round" strokeJoin="round" />
  </svg>
);

const FolderGridIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M20 35 H40 L45 40 H80 V75 H20 Z" fill="#3B82F6" />
    <rect x="30" y="50" width="10" height="10" rx="2" fill="white" opacity="0.6" />
    <rect x="45" y="50" width="10" height="10" rx="2" fill="white" opacity="0.6" />
    <rect x="60" y="50" width="10" height="10" rx="2" fill="white" opacity="0.6" />
  </svg>
);

const QuickCopyIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="25" y="35" width="40" height="40" rx="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
    <rect x="40" y="20" width="40" height="40" rx="6" fill="#10B981" />
    <path d="M50 35 H70 M50 45 H60" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const BackupIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M25 65 Q15 65 15 55 Q15 45 30 45 Q35 25 55 25 Q75 25 75 45 Q85 45 85 55 Q85 65 75 65 Z" fill="#3B82F6" opacity="0.2" />
    <path d="M50 45 V75 M40 55 L50 45 L60 55" stroke="#3B82F6" strokeWidth="6" fill="none" strokeLinecap="round" strokeJoin="round" />
  </svg>
);

const BgEraserIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="60" height="60" rx="10" fill="#E2E8F0" strokeDasharray="4 4" stroke="#94A3B8" strokeWidth="2" />
    <rect x="45" y="35" width="20" height="40" rx="4" fill="#EF4444" transform="rotate(45 55 55)" />
    <rect x="52" y="30" width="12" height="15" rx="2" fill="#FCA5A5" transform="rotate(45 55 55)" />
  </svg>
);

const QuickSearchLensIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="45" cy="45" r="25" stroke="#8B5CF6" strokeWidth="8" fill="none" />
    <path d="M62 62 L85 85" stroke="#8B5CF6" strokeWidth="10" strokeLinecap="round" />
    <circle cx="40" cy="40" r="8" fill="#8B5CF6" opacity="0.2" />
  </svg>
);

const MyEmojiBonusSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
                        <span className="bg-gradient-to-l from-rose-600 to-pink-800 bg-clip-text text-transparent flex items-center justify-center gap-3">
                            <Gift className="w-10 h-10 text-rose-600" />
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
                    <div className="rounded-[2.5rem] glass-card shadow-2xl border border-rose-200 dark:border-rose-900/50 hover:shadow-rose-500/20 transition-all duration-500">
                        <div className="flex flex-col space-y-1.5 p-10 text-center">
                            <h3 className="font-bold tracking-tight text-2xl text-text-dark dark:text-text-light mb-4">{t.myEmojiBonusCardTitle}</h3>
                            <p className="text-text-dark/70 dark:text-text-light/70 text-lg leading-relaxed font-light">
                                {t.myEmojiBonusCardDesc}
                                <br />
                                <span className="text-sm mt-4 block font-medium bg-rose-50 dark:bg-rose-900/30 py-2 px-4 rounded-full inline-block">
                                    <strong>{t.myEmojiBonusCardCredit.split(':')[0]}:</strong>
                                    {t.myEmojiBonusCardCredit.split(':')[1]}
                                    <a href="https://www.prog.co.il/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 underline ms-1">
                                        https://www.prog.co.il/
                                    </a>
                                </span>
                            </p>
                        </div>
                        <div className="p-10 pt-0 text-center">
                            <a 
                                href="https://67d80604326ae.site123.me/versions/2/wizard/modules/fileManager/downloadDigitalFile.php?url=https%3A%2F%2Ffiles.cdn-files-a.com%2Fuploads%2F10483955%2Fsecure%2Fnormal_6814b05f6be2e.zip" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-l from-rose-600 to-pink-700 hover:from-rose-700 hover:to-pink-800 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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
      icon: HappyPhotoIcon
    },
    {
      title: t.myEmojiFeature2Title,
      description: t.myEmojiFeature2Desc,
      icon: FolderGridIcon
    },
    {
      title: t.myEmojiFeature3Title,
      description: t.myEmojiFeature3Desc,
      icon: QuickCopyIcon
    },
    {
      title: t.myEmojiFeature4Title,
      description: t.myEmojiFeature4Desc,
      icon: BackupIcon
    },
    {
      title: t.myEmojiFeature5Title,
      description: t.myEmojiFeature5Desc,
      icon: BgEraserIcon
    },
    {
      title: t.myEmojiFeature6Title,
      description: t.myEmojiFeature6Desc,
      icon: QuickSearchLensIcon
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
    >
      <MyEmojiBonusSection />
    </ExtensionLayout>
  );
}
