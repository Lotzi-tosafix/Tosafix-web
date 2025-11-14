
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { Download, Copy, FileDown } from 'lucide-react';

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// FIX: Update AnimatedDiv to be of type React.FC. This correctly types it as a React component, resolving errors related to the missing 'children' prop and the unrecognized 'key' prop.
type AnimatedDivProps = {
    children: React.ReactNode;
    className?: string;
};

const AnimatedDiv: React.FC<AnimatedDivProps> = ({ children, className = "" }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={itemVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};


const HeroSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://files.cdn-files-a.com/uploads/10483955/2000_gi-67d81a84b4c80.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-transparent"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedDiv className="text-center">
                    <div className="w-32 h-32 mx-auto mb-8 rounded-3xl shadow-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <div className="w-28 h-28 bg-white/80 dark:bg-white/20 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-sm">
                            <img src="https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png" alt={t.notiPageTitle} className="w-24 h-24 object-contain" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">{t.notiPageTitle}</h1>
                    <p className="text-2xl md:text-3xl text-white/90 mb-4 font-bold">{t.notiPageSubtitle}</p>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white/80">{t.notiPageDescription}</p>
                </AnimatedDiv>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const features = [
        { title: t.notiFeatureUnifiedInboxTitle, description: t.notiFeatureUnifiedInboxDesc, image: "https://images.cdn-files-a.com/ready_uploads/media/6676462/400_5f8bf3e6b777b.jpg" },
        { title: t.notiFeatureCustomizationTitle, description: t.notiFeatureCustomizationDesc, image: "https://images.cdn-files-a.com/ready_uploads/media/3330107/400_5e482f12bb43b.jpg" },
        { title: t.notiFeatureFlexibleUITitle, description: t.notiFeatureFlexibleUIDesc, image: "https://images.cdn-files-a.com/ready_uploads/media/7269606/400_5fb7e4408bca4.jpg" },
        { title: t.notiFeatureWideSupportTitle, description: t.notiFeatureWideSupportDesc, image: "https://files.cdn-files-a.com/uploads/10483955/400_gi-67e461103c91c.jpg" },
        { title: t.notiFeaturePerformanceTitle, description: t.notiFeaturePerformanceDesc, image: "https://images.cdn-files-a.com/ready_uploads/media/9906303/400_684c38ddb5a23.jpg" },
        { title: t.notiFeaturePrivacyTitle, description: t.notiFeaturePrivacyDesc, image: "https://images.cdn-files-a.com/ready_uploads/media/1940743/400_5dd206fbc03b8.jpg" }
    ];
    return (
        <section className="py-20 bg-white dark:bg-bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light">
                        <span style={{ background: 'linear-gradient(135deg, #79C9E8 0%, #B18BE8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {t.notiFeaturesSectionTitle}
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">{t.notiFeaturesSectionSubtitle}</p>
                </AnimatedDiv>
                <div className="flex flex-wrap justify-center gap-8">
                    {features.map((feature, index) => (
                        <AnimatedDiv key={index} className="w-full max-w-sm">
                            <div className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border rounded-lg p-6 border-primary/50">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #79C9E8 0%, #B18BE8 100%)' }}>
                                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-semibold text-center mb-3 text-text-dark dark:text-text-light">{feature.title}</h3>
                                <p className="text-sm text-center leading-relaxed text-text-dark/70 dark:text-text-light/70">{feature.description}</p>
                            </div>
                        </AnimatedDiv>
                    ))}
                </div>
            </div>
        </section>
    );
};

const SupportedForumsSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
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
    return (
        <section className="py-20 bg-white dark:bg-bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-text-light mb-4">
                        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">{t.notiSupportSectionTitle}</span>
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300">{t.notiSupportSectionSubtitle}</p>
                </AnimatedDiv>
                <div className="flex flex-wrap justify-center items-start gap-8">
                    {forums.map((forum, index) => (
                         <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="flex flex-col items-center"
                        >
                            <a href={forum.url} target="_blank" rel="noopener noreferrer" className="group block">
                                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-slate-100 dark:border-gray-700">
                                    <img src={forum.icon} alt={forum.name} className="w-10 h-10 object-contain" />
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3 group-hover:text-primary transition-colors">{forum.name}</p>
                            </a>
                        </motion.div>
                    ))}
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300 text-center mt-8">{t.andMore}</p>
            </div>
        </section>
    );
};


const InstallSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20 bg-white dark:bg-bg-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-text-dark dark:text-text-light">
                        <span style={{ background: 'linear-gradient(135deg, #79C9E8 0%, #B18BE8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                           {t.notiInstallSectionTitle}
                        </span>
                    </h2>
                    <p className="text-lg mb-8 leading-relaxed text-text-dark/70 dark:text-text-light/70">{t.notiInstallSectionDesc}</p>
                    <a href="https://chromewebstore.google.com/detail/noti/hgceibdlnoiclpkmgccijjgdkocflkfj?utm_source=ext_app_menu" target="_blank" rel="noopener noreferrer">
                        <style>
                            {`@keyframes chromeGradient {
                                0% { background-position: 0% 0%; }
                                100% { background-position: 200% 0%; }
                            }`}
                        </style>
                        <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto" style={{ background: 'linear-gradient(90deg, rgb(219, 68, 55) 0%, rgb(244, 180, 0) 25%, rgb(15, 157, 88) 50%, rgb(66, 133, 244) 75%, rgb(219, 68, 55) 100%) 0% 0% / 200% 100%', animation: '3s linear 0s infinite normal none running chromeGradient' }}>
                            <Download className="me-2 -ms-1 h-5 w-5" />
                            {t.chromeWebStore}
                        </button>
                    </a>
                </AnimatedDiv>
            </div>
        </section>
    );
};

const PrivacySection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const [copyButtonText, setCopyButtonText] = useState(t.copy);
    const content = t.notiForumPrivacyPolicy;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(content).then(() => {
            setCopyButtonText(t.copied);
            setTimeout(() => setCopyButtonText(t.copy), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            setCopyButtonText(t.copyError);
            setTimeout(() => setCopyButtonText(t.copy), 2000);
        });
    };

    const downloadAsTxt = () => {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'privacy-policy.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <section className="py-20 bg-bg-light dark:bg-bg-dark/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv>
                    <div className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 md:p-12 shadow-lg border border-primary/50">
                        <h2 className="text-3xl font-bold mb-6 text-text-dark dark:text-text-light text-center">{t.notiPrivacySectionTitle}</h2>
                        <div className="relative bg-gray-50 dark:bg-gray-900/50 p-6 sm:p-8 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
                             <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto flex gap-2">
                                <button onClick={copyToClipboard} title={t.copyPolicyTooltip} className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-600 dark:text-gray-300 transition-colors">
                                    <Copy size={16} />
                                    <span className="sr-only">{copyButtonText}</span>
                                </button>
                                <button onClick={downloadAsTxt} title={t.downloadPolicyTooltip} className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-gray-600 dark:text-gray-300 transition-colors">
                                    <FileDown size={16} />
                                     <span className="sr-only">{t.download}</span>
                                </button>
                            </div>
                            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans text-right rtl:text-right ltr:text-left">
                               {content}
                            </pre>
                        </div>
                    </div>
                </AnimatedDiv>
            </div>
        </section>
    );
};

export default function NotiForum() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
        <HeroSection />
        <FeaturesSection />
        <SupportedForumsSection />
        <InstallSection />
        <PrivacySection />
    </div>
  );
}
