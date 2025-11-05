
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function HebrewDate() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.hebrewDateFeature1,
      description: t.hebrewDateFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/2732291/400_5e1002b5cfc96.jpg'
    },
    {
      title: t.hebrewDateFeature2,
      description: t.hebrewDateFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/11893185/400_646527c16caff.jpg'
    },
    {
      title: t.hebrewDateFeature3,
      description: t.hebrewDateFeature3Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_680d5a90a72ae.png'
    },
    {
      title: t.hebrewDateFeature4,
      description: t.hebrewDateFeature4Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/4109389/400_5e59d914e19ee.jpg'
    },
    {
      title: t.hebrewDateFeature5,
      description: t.hebrewDateFeature5Desc,
      image: 'https://picsum.photos/seed/hebrewdate5/800/600'
    }
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome. להתקנה ידנית, יש לחלץ את התיקייה ולטעון אותה באופן ידני.' : 'Download from the Chrome Web Store. For manual installation, extract the folder and load it manually.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/hebrew-date/gijmopkocgjcpinlkmlkifgfhejjffom?utm_source=item-share-cb',
    downloadUrl: 'https://www.googleapis.com/drive/v3/files/1Xq1q1Q1Q1q1Q1q1Q1q1Q1q1Q1q1Q1q1Q?alt=media&key=AIzaSyDduW1Zbi2MIu8aMUMF6op72pJ1f0sPBi0' // Fictional URL
  };

  return (
    <ExtensionLayout
      name={t.hebrewDateName}
      description={t.hebrewDateDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png"
      features={features}
      installSection={installSection}
      privacyPolicyUrl="#"
    />
  );
}