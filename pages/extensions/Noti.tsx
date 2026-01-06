
import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function NotiForum() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.notiFeatureUnifiedInboxTitle,
      description: t.notiFeatureUnifiedInboxDesc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/6676462/400_5f8bf3e6b777b.jpg'
    },
    {
      title: t.notiFeatureCustomizationTitle,
      description: t.notiFeatureCustomizationDesc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/3330107/400_5e482f12bb43b.jpg'
    },
    {
      title: t.notiFeatureFlexibleUITitle,
      description: t.notiFeatureFlexibleUIDesc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/7269606/400_5fb7e4408bca4.jpg'
    },
    {
      title: t.notiFeatureWideSupportTitle,
      description: t.notiFeatureWideSupportDesc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e461103c91c.jpg'
    },
    {
      title: t.notiFeaturePerformanceTitle,
      description: t.notiFeaturePerformanceDesc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/9906303/400_684c38ddb5a23.jpg'
    },
    {
      title: t.notiFeaturePrivacyTitle,
      description: t.notiFeaturePrivacyDesc,
      image: 'https://images.cdn-files-a.com/ready_uploads/media/1940743/400_5dd206fbc03b8.jpg'
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
