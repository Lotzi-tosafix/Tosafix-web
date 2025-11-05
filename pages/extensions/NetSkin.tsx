
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function NetSkin() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.netSkinFeature1,
      description: t.netSkinFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/145266/400_5ce9f80c55e42.jpg'
    },
    {
      title: t.netSkinFeature2,
      description: t.netSkinFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/3558404/400_5f14a4d8dc3b4.jpg'
    },
    {
      title: t.netSkinFeature3,
      description: t.netSkinFeature3Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/11718969/400_6453bc0c1fb52.jpg'
    },
    {
      title: t.netSkinFeature4,
      description: t.netSkinFeature4Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/9488413/400_637d82df6d944.jpg'
    }
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome. להתקנה ידנית, יש לחלץ את התיקייה ולטעון אותה באופן ידני.' : 'Download from the Chrome Web Store. For manual installation, extract the folder and load it manually.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/netskin/hcnofgnpchbdfmjhfgffkfkblfofgaea?utm_source=item-share-cb',
    downloadUrl: 'https://www.googleapis.com/drive/v3/files/1Xq1q1Q1Q1q1Q1q1Q1q1Q1q1Q1q1Q1q1Q?alt=media&key=AIzaSyDduW1Zbi2MIu8aMUMF6op72pJ1f0sPBi0' // Fictional URL
  };

  const supportedForums = [
    { name: "פורום נטפרי", url: "#" },
    { name: "פרוג", url: "#" },
    { name: "כיכר השבת", url: "#" },
    { name: "בחדרי חרדים", url: "#" }
  ];

  return (
    <ExtensionLayout
      name={t.netSkinName}
      description={t.netSkinDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_68ab2c12bf824.png"
      features={features}
      installSection={installSection}
      supportedForums={supportedForums}
      privacyPolicyUrl="#"
    />
  );
}
