

import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function HebrewDate() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.hebrewDateFeature1Title,
      description: t.hebrewDateFeature1Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/2732291/400_5e1002b5cfc96.jpg'
    },
    {
      title: t.hebrewDateFeature2Title,
      description: t.hebrewDateFeature2Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/11893185/400_646527c16caff.jpg'
    },
    {
      title: t.hebrewDateFeature3Title,
      description: t.hebrewDateFeature3Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_680d5a90a72ae.png'
    },
    {
      title: t.hebrewDateFeature4Title,
      description: t.hebrewDateFeature4Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/4109389/400_5e59d914e19ee.jpg'
    },
    {
      title: t.hebrewDateFeature5Title,
      description: t.hebrewDateFeature5Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/21153/400_5cdbdf0b1b663.jpg'
    },
    {
      title: t.hebrewDateFeature6Title,
      description: t.hebrewDateFeature6Desc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/6863/400_5cda64d492a81.jpg'
    }
  ];

  const installSection = {
    description: t.notiInstallDesc,
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/hbpdljfncgnolomebnkannnaijhndamm?utm_source=item-share-cb',
  };

  return (
    <ExtensionLayout
      name={t.hebrewDateName}
      description={t.hebrewDateDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_6806ed720e298.png"
      features={features}
      installSection={installSection}
    />
  );
}