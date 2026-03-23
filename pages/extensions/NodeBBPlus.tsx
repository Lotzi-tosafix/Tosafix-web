import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for NodeBB Plus ---

const DashboardIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="nbeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="15" y="15" width="30" height="30" rx="6" fill="url(#nbeGrad1)" opacity="0.8" />
    <rect x="55" y="15" width="30" height="30" rx="6" fill="url(#nbeGrad1)" opacity="0.4" />
    <rect x="15" y="55" width="30" height="30" rx="6" fill="url(#nbeGrad1)" opacity="0.4" />
    <rect x="55" y="55" width="30" height="30" rx="6" fill="url(#nbeGrad1)" opacity="0.8" />
  </svg>
);

const ExportIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 20 L50 65" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" />
    <path d="M30 45 L50 65 L70 45" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 80 L80 80" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const MarkdownIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="25" width="70" height="50" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="4" />
    <path d="M30 60 V40 L40 50 L50 40 V60" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M60 40 V60 M60 60 L55 50 M60 60 L65 50" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SidebarIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="20" width="70" height="60" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
    <rect x="20" y="25" width="20" height="50" rx="4" fill="#F59E0B" opacity="0.8" />
    <rect x="45" y="30" width="35" height="6" rx="3" fill="#E2E8F0" />
    <rect x="45" y="45" width="25" height="6" rx="3" fill="#E2E8F0" />
  </svg>
);

const RecentIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="35" fill="none" stroke="#3B82F6" strokeWidth="6" />
    <path d="M50 25 V50 L65 65" fill="none" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AutoDetectIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="30" fill="#E2E8F0" />
    <circle cx="50" cy="50" r="15" fill="#10B981" className="animate-pulse" />
    <path d="M50 10 L50 20 M50 80 L50 90 M10 50 L20 50 M80 50 L90 50" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export default function NodeBBPlus() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.nodebbPlusFeature1Title,
      description: t.nodebbPlusFeature1Desc,
      icon: DashboardIcon
    },
    {
      title: t.nodebbPlusFeature2Title,
      description: t.nodebbPlusFeature2Desc,
      icon: ExportIcon
    },
    {
      title: t.nodebbPlusFeature3Title,
      description: t.nodebbPlusFeature3Desc,
      icon: MarkdownIcon
    },
    {
      title: t.nodebbPlusFeature4Title,
      description: t.nodebbPlusFeature4Desc,
      icon: SidebarIcon
    },
    {
      title: t.nodebbPlusFeature5Title,
      description: t.nodebbPlusFeature5Desc,
      icon: RecentIcon
    },
    {
      title: t.nodebbPlusFeature6Title,
      description: t.nodebbPlusFeature6Desc,
      icon: AutoDetectIcon
    }
  ];

  const installSection = {
    description: t.nodebbPlusComingSoon,
    chromeStoreUrl: '#', // Coming soon
  };

  return (
    <ExtensionLayout
      name={t.nodebbPlusName}
      description={t.nodebbPlusDesc}
      logo="https://lh3.googleusercontent.com/PA9OHC7cPkSpqzJXazStpEvOTHmHLt8Nq3EtZ-1LKbaTZoPset5M3NRizV7VwJKTJ4jtZmCVdfn6425RNUR08dkmSw=s120"
      features={features}
      installSection={installSection}
      privacyPolicyContent={t.nodebbPlusPrivacyPolicy}
    />
  );
}
