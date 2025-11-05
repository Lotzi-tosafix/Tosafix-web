
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function EdgeOpener() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.edgeOpenerFeature1,
      description: t.edgeOpenerFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/24147/400_5cdcf4dfcd425.jpg'
    },
    {
      title: t.edgeOpenerFeature2,
      description: t.edgeOpenerFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/5878/400_5cda5ef11db09.jpg'
    },
    {
      title: t.edgeOpenerFeature3,
      description: t.edgeOpenerFeature3Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/5156821/400_5ebbf38903ef2.jpg'
    }
  ];

  const installSection = {
    description: language === 'he' ? 'להורדה מחנות האינטרנט של Chrome. להתקנה ידנית, יש לחלץ את התיקייה ולטעון אותה באופן ידני.' : 'Download from the Chrome Web Store. For manual installation, extract the folder and load it manually.',
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/edge-opener/lapacahlnhgpkkjjpfcfklopgcdaedhh?utm_source=item-share-cb',
    downloadUrl: 'https://www.googleapis.com/drive/v3/files/1MDSnG7ZH1oub0vm4uR38Y1n46HLb05ei?alt=media&key=AIzaSyDduW1Zbi2MIu8aMUMF6op72pJ1f0sPBi0'
  };

  return (
    <ExtensionLayout
      name={t.edgeOpenerName}
      description={t.edgeOpenerDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_6806edcc12daa.png"
      features={features}
      installSection={installSection}
      privacyPolicyUrl="#"
    />
  );
}