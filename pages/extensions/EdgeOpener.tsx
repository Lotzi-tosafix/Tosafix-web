
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

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
    />
  );
}