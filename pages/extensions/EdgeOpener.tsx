
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for Edge Opener ---

const BrowserSwitchIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="35" cy="50" r="20" fill="#3B82F6" opacity="0.2" stroke="#3B82F6" strokeWidth="2" />
    <path d="M35 40 Q45 40 45 50 T35 60" fill="none" stroke="#3B82F6" strokeWidth="4" />
    <circle cx="65" cy="50" r="20" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="2" />
    <path d="M65 40 H75 M65 50 H75 M65 60 H75" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
    <path d="M42 50 H58" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    <path d="M54 45 L58 50 L54 55" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" strokeJoin="round" />
  </svg>
);

const CopyLinkIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="25" y="35" width="40" height="40" rx="6" fill="#E2E8F0" />
    <rect x="40" y="20" width="40" height="40" rx="6" fill="#3B82F6" />
    <circle cx="60" cy="40" r="10" fill="white" opacity="0.3" />
    <path d="M50 40 H70" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const SofaEaseIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M20 70 H80 V80 H20 Z" fill="#94A3B8" />
    <rect x="25" y="50" width="50" height="20" rx="5" fill="#8B5CF6" />
    <rect x="20" y="55" width="10" height="15" rx="2" fill="#7C3AED" />
    <rect x="70" y="55" width="10" height="15" rx="2" fill="#7C3AED" />
    <path d="M35 45 Q50 35 65 45" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

export default function EdgeOpener() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.edgeOpenerFeature1Title,
      description: t.edgeOpenerFeature1Desc,
      icon: BrowserSwitchIcon
    },
    {
      title: t.edgeOpenerFeature2Title,
      description: t.edgeOpenerFeature2Desc,
      icon: CopyLinkIcon
    },
    {
      title: t.edgeOpenerFeature3Title,
      description: t.edgeOpenerFeature3Desc,
      icon: SofaEaseIcon
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
      privacyPolicyContent={t.edgeOpenerPrivacyPolicy}
    />
  );
}
