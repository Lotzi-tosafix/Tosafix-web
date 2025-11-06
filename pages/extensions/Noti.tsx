import React from 'react';
import ExtensionLayout from '../../components/extension/ExtensionLayout';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

export default function NotiForum() {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      title: t.notiFeature1Title,
      description: t.notiFeature1Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e46136c0c85.jpg'
    },
    {
      title: t.notiFeature2Title,
      description: t.notiFeature2Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e45a0634741.jpg'
    },
    {
      title: t.notiFeature3Title,
      description: t.notiFeature3Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e45a6323c07.jpg'
    },
    {
      title: t.notiFeature4Title,
      description: t.notiFeature4Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e461103c91c.jpg'
    },
    {
      title: t.notiFeature5Title,
      description: t.notiFeature5Desc,
      image: 'https://files.cdn-files-a.com/uploads/10483955/400_gi-67e460fce8a6c.jpg'
    }
  ];

  const installSection = {
    description: t.notiInstallDesc,
    chromeStoreUrl: 'https://chromewebstore.google.com/detail/noti/hgceibdlnoiclpkmgccijjgdkocflkfj?utm_source=ext_app_menu',
  };
  
  const supportedForums = [
      { name: "מתמחים טופ", url: "https://mitmachim.top/", icon: "https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_67d80bb717e4f.png" },
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

  return (
    <ExtensionLayout
      name={t.notiForumName}
      description={t.notiForumDesc}
      logo="https://files.cdn-files-a.com/uploads/10483955/400_67e410c38cc1d.png"
      features={features}
      installSection={installSection}
      supportedForums={supportedForums}
      privacyPolicyContent={t.notiForumPrivacyPolicy}
    />
  );
}