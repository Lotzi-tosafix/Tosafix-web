
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function Yamina() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.yaminaFeature1,
      description: t.yaminaFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/24147/400_5cdcf4dfcd425.jpg'
    },
    {
      title: t.yaminaFeature2,
      description: t.yaminaFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/5878/400_5cda5ef11db09.jpg'
    },
    {
      title: t.yaminaFeature3,
      description: t.yaminaFeature3Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/5156821/400_5ebbf38903ef2.jpg'
    },
    {
      title: t.yaminaFeature4,
      description: t.yaminaFeature4Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/182116/400_5cebd6d2d1a23.jpg'
    }
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome. להתקנה ידנית, יש לחלץ את התיקייה ולטעון אותה באופן ידני.' : 'Download from the Chrome Web Store. For manual installation, extract the folder and load it manually.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/yamina/pemfobcalhchapdppdmeopkhhmdobhfl?utm_source=item-share-cb',
    downloadUrl: 'https://www.googleapis.com/drive/v3/files/1Xq1q1Q1Q1q1Q1q1Q1q1Q1q1Q1q1Q1q1Q?alt=media&key=AIzaSyDduW1Zbi2MIu8aMUMF6op72pJ1f0sPBi0' // Fictional URL
  };

  return (
    <ExtensionLayout
      name={t.yaminaName}
      description={t.yaminaDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_67e4106bd03f6.png"
      features={features}
      installSection={installSection}
      privacyPolicyUrl="#"
    />
  );
}
