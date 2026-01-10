
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for Hebrew Date Viewer ---

const HoverEyeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M15 50 C30 30 70 30 85 50 C70 70 30 70 15 50Z" fill="#79C9E8" opacity="0.2" stroke="#3B82F6" strokeWidth="2" />
    <circle cx="50" cy="50" r="12" fill="#3B82F6" />
    <circle cx="55" cy="45" r="4" fill="white" />
    <path d="M10 20 L25 35 M90 20 L75 35 M50 10 V25" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const AccurateTargetIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="35" stroke="#EF4444" strokeWidth="8" fill="none" />
    <circle cx="50" cy="50" r="20" stroke="#EF4444" strokeWidth="6" fill="none" opacity="0.6" />
    <circle cx="50" cy="50" r="5" fill="#EF4444" />
    <path d="M50 10 V20 M50 80 V90 M10 50 H20 M80 50 H90" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const HandClickIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M40 70 V40 A10 10 0 1 1 60 40 V70" stroke="#8B5CF6" strokeWidth="10" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="25" r="15" fill="#8B5CF6" opacity="0.1" />
    <path d="M35 85 Q50 65 65 85" stroke="#8B5CF6" strokeWidth="4" fill="none" />
  </svg>
);

const GlobalSitesIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="35" fill="#10B981" opacity="0.2" />
    <ellipse cx="50" cy="50" rx="15" ry="35" stroke="#10B981" strokeWidth="2" fill="none" />
    <ellipse cx="50" cy="50" rx="35" ry="15" stroke="#10B981" strokeWidth="2" fill="none" />
    <line x1="15" y1="50" x2="85" y2="50" stroke="#10B981" strokeWidth="2" />
    <line x1="50" y1="15" x2="50" y2="85" stroke="#10B981" strokeWidth="2" />
  </svg>
);

const CleanDesignIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="20" width="60" height="60" rx="15" fill="white" stroke="#E2E8F0" strokeWidth="2" />
    <rect x="30" y="35" width="40" height="6" rx="3" fill="#CBD5E1" />
    <rect x="30" y="50" width="30" height="6" rx="3" fill="#CBD5E1" />
    <circle cx="70" cy="70" r="10" fill="#3B82F6" />
  </svg>
);

const PowerSwitchIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="25" y="35" width="50" height="30" rx="15" fill="#10B981" />
    <circle cx="60" cy="50" r="12" fill="white" />
    <path d="M40 45 V55" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export default function HebrewDate() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.hebrewDateFeature1Title,
      description: t.hebrewDateFeature1Desc,
      icon: HoverEyeIcon
    },
    {
      title: t.hebrewDateFeature2Title,
      description: t.hebrewDateFeature2Desc,
      icon: AccurateTargetIcon
    },
    {
      title: t.hebrewDateFeature3Title,
      description: t.hebrewDateFeature3Desc,
      icon: HandClickIcon
    },
    {
      title: t.hebrewDateFeature4Title,
      description: t.hebrewDateFeature4Desc,
      icon: GlobalSitesIcon
    },
    {
      title: t.hebrewDateFeature5Title,
      description: t.hebrewDateFeature5Desc,
      icon: CleanDesignIcon
    },
    {
      title: t.hebrewDateFeature6Title,
      description: t.hebrewDateFeature6Desc,
      icon: PowerSwitchIcon
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
      privacyPolicyContent={t.hebrewDatePrivacyPolicy}
    />
  );
}
