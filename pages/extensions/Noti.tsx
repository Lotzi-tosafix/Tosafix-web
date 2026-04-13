
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

// --- Custom Colorful SVG Icons for NotiForum ---

const UnifiedInboxIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <linearGradient id="notiGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="20" y="25" width="60" height="50" rx="10" fill="url(#notiGrad1)" opacity="0.2" />
    <path d="M15 35 L50 60 L85 35 V75 H15 Z" fill="url(#notiGrad1)" />
    <circle cx="80" cy="30" r="12" fill="#EF4444" stroke="white" strokeWidth="3" />
    <text x="80" y="34" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">3</text>
  </svg>
);

const InlineContentIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="15" width="60" height="70" rx="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
    <rect x="30" y="30" width="40" height="6" rx="3" fill="#CBD5E1" />
    <rect x="30" y="45" width="30" height="6" rx="3" fill="#CBD5E1" />
    <rect x="30" y="60" width="35" height="6" rx="3" fill="#CBD5E1" />
    <circle cx="65" cy="65" r="14" fill="#3B82F6" opacity="0.9" />
    <circle cx="63" cy="63" r="5" fill="none" stroke="white" strokeWidth="2" />
    <line x1="67" y1="67" x2="72" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const CustomizationIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="20" y="30" width="60" height="10" rx="5" fill="#E2E8F0" />
    <circle cx="40" cy="35" r="10" fill="#3B82F6" shadow="lg" />
    <rect x="20" y="55" width="60" height="10" rx="5" fill="#E2E8F0" />
    <circle cx="70" cy="60" r="10" fill="#8B5CF6" />
    <path d="M45 45 L55 45" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const FlexibleUIIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="20" width="70" height="60" rx="8" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
    <rect x="20" y="25" width="15" height="50" rx="4" fill="#3B82F6" opacity="0.8" />
    <rect x="40" y="30" width="40" height="8" rx="2" fill="#E2E8F0" />
    <rect x="40" y="45" width="30" height="8" rx="2" fill="#E2E8F0" />
    <circle cx="75" cy="70" r="6" fill="#F59E0B" />
  </svg>
);

const SmartAdditionIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M25 30 C25 15 40 15 50 15 C60 15 75 15 75 30 C75 45 60 45 50 45 C45 45 35 50 30 55 C32 50 30 45 25 40 C20 35 25 30 25 30 Z" fill="#E2E8F0" />
    <path d="M35 50 C35 35 50 35 60 35 C70 35 85 35 85 50 C85 65 70 65 60 65 C55 65 45 70 40 75 C42 70 40 65 35 60 C30 55 35 50 35 50 Z" fill="#3B82F6" />
    <rect x="58" y="44" width="4" height="12" rx="1" fill="white" />
    <rect x="54" y="48" width="12" height="4" rx="1" fill="white" />
    <path d="M75 20 L77 25 L82 27 L77 29 L75 34 L73 29 L68 27 L73 25 Z" fill="#F59E0B" />
    <path d="M25 60 L26 63 L29 64 L26 65 L25 68 L24 65 L21 64 L24 63 Z" fill="#8B5CF6" />
  </svg>
);

const PrivacyIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 15 L80 30 V50 C80 70 50 85 50 85 C50 85 20 70 20 50 V30 L50 15Z" fill="#3B82F6" opacity="0.2" />
    <path d="M50 20 L75 32 V50 C75 65 50 78 50 78 C50 78 25 65 25 50 V32 L50 20Z" fill="#3B82F6" />
    <rect x="42" y="45" width="16" height="12" rx="2" fill="white" />
    <path d="M45 45 V40 A5 5 0 1 1 55 40 V45" stroke="white" strokeWidth="3" fill="none" />
  </svg>
);

export default function NotiForum() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.notiFeatureUnifiedInboxTitle,
      description: t.notiFeatureUnifiedInboxDesc,
      // Fixed typo: Changed UnifiedInboxInboxIcon to UnifiedInboxIcon
      icon: UnifiedInboxIcon
    },
    {
      title: t.notiFeatureCustomizationTitle,
      description: t.notiFeatureCustomizationDesc,
      icon: InlineContentIcon
    },
    {
      title: t.notiFeatureFlexibleUITitle,
      description: t.notiFeatureFlexibleUIDesc,
      icon: CustomizationIcon
    },
    {
      title: t.notiFeatureWideSupportTitle,
      description: t.notiFeatureWideSupportDesc,
      icon: FlexibleUIIcon
    },
    {
      title: t.notiFeaturePerformanceTitle,
      description: t.notiFeaturePerformanceDesc,
      icon: SmartAdditionIcon
    },
    {
      title: t.notiFeaturePrivacyTitle,
      description: t.notiFeaturePrivacyDesc,
      icon: PrivacyIcon
    }
  ];

  const forums = [
    { name: "מתמחים טופ", url: "https://mitmachim.top/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_690dd0cd82a10.png" },
    { name: "פרוג", url: "https://www.prog.co.il/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d80c5e301c2.png" },
    { name: "תחומים", url: "https://tchumim.com/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d80d2bf3480.png" },
    { name: "ימות המשיח", url: "https://f2.freeivr.co.il/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d80ff2131c2.png" },
    { name: "פורום נטפרי", url: "https://forum.netfree.link/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d810f5133b2.png" },
    { name: "פורום סייפר", url: "https://forum.safera.co.il/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d81153a4a93.png" },
    { name: "רכבים זה לזה", url: "https://rechavimzelaze.ovh/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_67d811d508a90.png" },
    { name: "המוזיקאי", url: "https://hamusicay.com/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_67d8124106483.jpg" },
    { name: "מקצב", url: "https://miktzav.com/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d81300c8447.png" },
    { name: "מורשת מרן", url: "https://forum.moreshet-maran.com/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d813734955e.png" },
    { name: "פורום לתורה", url: "https://tora-forum.co.il/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d813b367b0d.png" },
    { name: "הסולידית", url: "https://www.hasolidit.com/kehila/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_67d81429d107a.png" },
  ];

  const installSection = {
    description: t.notiInstallSectionDesc,
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/noti/hgceibdlnoiclpkmgccijjgdkocflkfj?utm_source=ext_app_menu',
  };

  return (
    <ExtensionLayout
      name={t.notiPageTitle}
      description={t.notiPageDescription}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png"
      features={features}
      installSection={installSection}
      privacyPolicyContent={t.notiForumPrivacyPolicy}
      supportedForums={forums}
    />
  );
}
