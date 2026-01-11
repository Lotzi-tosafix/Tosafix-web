
import React from 'react';
import { motion } from 'framer-motion';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons ---

const CardInterfaceIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#79C9E8', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#B18BE8', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="15" y="20" width="70" height="50" rx="8" fill="url(#grad1)" opacity="0.2" />
    <rect x="10" y="30" width="40" height="50" rx="8" fill="url(#grad1)" />
    <rect x="55" y="35" width="35" height="40" rx="8" fill="#B18BE8" opacity="0.6" />
    <rect x="18" y="40" width="24" height="4" rx="2" fill="white" />
    <rect x="18" y="50" width="18" height="4" rx="2" fill="white" opacity="0.7" />
  </svg>
);

const OSDetectionIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="40" fill="#3B82F6" opacity="0.1" />
    <path d="M30 70 L50 25 L70 70 Z" fill="#3B82F6" />
    <circle cx="50" cy="45" r="10" fill="white" opacity="0.3" />
    <path d="M40 75 Q50 65 60 75" stroke="#79C9E8" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="50" r="5" fill="white" />
  </svg>
);

const FolderTreeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M20 30 H40 L45 35 H80 V75 H20 Z" fill="#FBBF24" />
    <path d="M20 40 H80 V75 H20 Z" fill="#F59E0B" />
    <rect x="35" y="50" width="30" height="4" rx="2" fill="white" opacity="0.5" />
    <circle cx="70" cy="30" r="12" fill="#10B981" />
    <path d="M65 30 L69 34 L76 27" stroke="white" strokeWidth="3" fill="none" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M15 25 Q50 25 85 25 L55 60 V85 L45 85 V60 Z" fill="#EF4444" opacity="0.2" />
    <path d="M20 20 H80 L55 55 V80 L45 80 V55 Z" fill="#F87171" />
    <circle cx="75" cy="25" r="8" fill="#FCA5A5" />
    <path d="M35 35 H65" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const PuzzleIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M30 30 H45 A10 10 0 1 1 55 30 H70 V45 A10 10 0 1 1 70 55 V70 H55 A10 10 0 1 0 45 70 H30 V55 A10 10 0 1 0 30 45 Z" fill="#8B5CF6" />
    <circle cx="50" cy="50" r="15" fill="white" opacity="0.2" />
    <rect x="48" y="42" width="4" height="16" rx="2" fill="white" />
    <rect x="42" y="48" width="16" height="4" rx="2" fill="white" />
  </svg>
);

const DarkModeIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="40" fill="#1E293B" />
    <path d="M50 20 A30 30 0 1 1 20 50 A25 25 0 1 0 50 20" fill="#FDE047" />
    <circle cx="70" cy="30" r="2" fill="white" />
    <circle cx="75" cy="60" r="3" fill="white" opacity="0.6" />
    <circle cx="30" cy="75" r="2" fill="white" />
  </svg>
);

export default function GFD() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.gfdFeature1Title,
      description: t.gfdFeature1Desc,
      icon: CardInterfaceIcon
    },
    {
      title: t.gfdFeature2Title,
      description: t.gfdFeature2Desc,
      icon: OSDetectionIcon
    },
    {
      title: t.gfdFeature3Title,
      description: t.gfdFeature3Desc,
      icon: FolderTreeIcon
    },
    {
      title: t.gfdFeature4Title,
      description: t.gfdFeature4Desc,
      icon: FilterIcon
    },
    {
      title: t.gfdFeature5Title,
      description: t.gfdFeature5Desc,
      icon: PuzzleIcon
    },
    {
      title: t.gfdFeature6Title,
      description: t.gfdFeature6Desc,
      icon: DarkModeIcon
    }
  ];

  const installSection = {
    description: t.notiInstallDesc,
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/github-friendly-downloads/apiieghcagbhlodhfijaepgaonmflhhp?utm_source=item-share-cb',
  };

  return (
    <ExtensionLayout
      name={t.gfdName}
      description={t.gfdDesc}
      logo="https://lh3.googleusercontent.com/r77r2zRyYLfTAWvBLy1zELxTgpCpRziU48cfEexOCC31KvdnettoQ1U58Amvgj6kCErQjX2GGIwe6DYV9SBAG-J03w=s120"
      features={features}
      installSection={installSection}
    />
  );
}
