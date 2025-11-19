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
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute inset-0">
                 <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent z-0"></div>
                 <img src="https://files.cdn-files-a.com/uploads/10483955/2000_gi-67d81a84b4c80.jpg" className="w-full h-full object-cover" alt="Background" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedDiv className="text-center">
                    <div className="w-32 h-32 mx-auto mb-8 rounded-[2rem] shadow-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[2px]">
                        <div className="w-full h-full bg-white/90 dark:bg-white/20 rounded-[1.9rem] flex items-center justify-center shadow-inner backdrop-blur-sm">
                            <img src="https://files.cdn-files-a.com/uploads/10483955/400_690c9b1f6bd80.png" alt={t.notiPageTitle} className="w-24 h-24 object-contain drop-shadow-lg" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-rubik tracking-tight drop-shadow-lg">{t.notiPageTitle}</h1>
                    <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                        <p className="text-2xl md:text-3xl text-white font-bold">{t.notiPageSubtitle}</p>
                    </div>
                    <p className="text-xl max-w-3xl mx-auto leading-relaxed text-white/90 font-light glass-card p-6 rounded-2xl border-white/20">{t.notiPageDescription}</p>
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
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light font-rubik">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {t.notiFeaturesSectionTitle}
                        </span>
                    </h2>
                    <p className="text-lg text-text-dark/60 dark:text-text-light/60 font-light">{t.notiFeaturesSectionSubtitle}</p>
                </AnimatedDiv>
                <div className="flex flex-wrap justify-center gap-8">
                    {features.map((feature, index) => (
                        <AnimatedDiv key={index} className="w-full max-w-sm">
                            <div className="h-full glass-card rounded-[2rem] p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/40 dark:border-white/10 flex flex-col">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-[2px] shadow-md">
                                    <div className="w-full h-full rounded-[14px] overflow-hidden">
                                        <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-3 text-text-dark dark:text-text-light">{feature.title}</h3>
                                <p className="text-sm text-center leading-relaxed text-text-dark/70 dark:text-text-light/70 font-light flex-grow">{feature.description}</p>
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
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
                        <span className="bg-gradient-to-l from-primary to-secondary bg-clip-text text-transparent">{t.notiSupportSectionTitle}</span>
                    </h2>
                    <p className="text-lg text-text-dark/60 dark:text-text-light/60 font-light">{t.notiSupportSectionSubtitle}</p>
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
                                <div className="w-20 h-20 glass-card rounded-full shadow-lg flex items-center justify-center group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 border border-white/40">
                                    <img src={forum.icon} alt={forum.name} className="w-12 h-12 object-contain" />
                                </div>
                                <p className="text-sm text-text-dark/70 dark:text-text-light/70 text-center mt-4 group-hover:text-primary transition-colors font-medium">{forum.name}</p>
                            </a>
                        </motion.div>
                    ))}
                </div>
                <p className="text-lg text-text-dark/50 dark:text-text-light/50 text-center mt-12 font-bold">{t.andMore}</p>
            </div>
        </section>
    );
};


const InstallSection = () => {
    const { language } = useLanguage();
    const t = translations[language];
    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv className="text-center glass-card p-12 rounded-[3rem] border border-white/40 dark:border-white/10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-text-dark dark:text-text-light font-rubik">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                           {t.notiInstallSectionTitle}
                        </span>
                    </h2>
                    <p className="text-lg mb-10 leading-relaxed text-text-dark/70 dark:text-text-light/70 max-w-xl mx-auto">{t.notiInstallSectionDesc}</p>
                    <a href="https://chromewebstore.google.com/detail/noti/hgceibdlnoiclpkmgccijjgdkocflkfj?utm_source=ext_app_menu" target="_blank" rel="noopener noreferrer">
                        <style>
                            {`@keyframes chromeGradient {
                                0% { background-position: 0% 0%; }
                                100% { background-position: 200% 0%; }
                            }`}
                        </style>
                        <button className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto" style={{ background: 'linear-gradient(90deg, rgb(219, 68, 55) 0%, rgb(244, 180, 0) 25%, rgb(15, 157, 88) 50%, rgb(66, 133, 244) 75%, rgb(219, 68, 55) 100%) 0% 0% / 200% 100%', animation: '3s linear 0s infinite normal none running chromeGradient' }}>
                            <Download className="me-2 -ms-1 h-6 w-6" />
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
        <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedDiv>
                    <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/40 dark:border-white/10">
                        <h2 className="text-3xl font-bold mb-8 text-text-dark dark:text-text-light text-center font-rubik">{t.notiPrivacySectionTitle}</h2>
                        <div className="relative bg-white/50 dark:bg-gray-900/50 p-6 sm:p-8 rounded-2xl shadow-inner border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
                             <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto flex gap-2">
                                <button onClick={copyToClipboard} title={t.copyPolicyTooltip} className="p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300 transition-colors shadow-sm">
                                    <Copy size={16} />
                                    <span className="sr-only">{copyButtonText}</span>
                                </button>
                                <button onClick={downloadAsTxt} title={t.downloadPolicyTooltip} className="p-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg text-gray-600 dark:text-gray-300 transition-colors shadow-sm">
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
    <div className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <SupportedForumsSection />
        <InstallSection />
        <PrivacySection />
    </div>
  );
}