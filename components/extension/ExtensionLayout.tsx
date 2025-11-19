import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Lock, ExternalLink, Copy, FileDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface InstallSection {
  description: string;
  chromeStoreUrl: string;
}

interface SupportedForum {
    name: string;
    url: string;
    icon?: string;
}

interface ExtensionLayoutProps {
  name: string;
  description: string;
  logo: string;
  features: Feature[];
  installSection: InstallSection;
  privacyPolicyUrl?: string;
  privacyPolicyContent?: string;
  supportedForums?: SupportedForum[];
  beforeFeaturesContent?: React.ReactNode;
  children?: React.ReactNode;
}

const PrivacyPolicyDisplay = ({ content }: { content: string }) => {
    const { language, isHebrew } = useLanguage();
    const t = translations[language];
    const [copyButtonText, setCopyButtonText] = useState(t.copy);

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
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans text-right rtl:text-right ltr:text-left">{content}</pre>
        </div>
    );
};

export default function ExtensionLayout({ 
  name, 
  description, 
  logo, 
  features, 
  installSection,
  privacyPolicyUrl,
  privacyPolicyContent,
  supportedForums,
  beforeFeaturesContent,
  children
}: ExtensionLayoutProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const scrollToInstallation = () => {
    document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
             <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-[2rem] shadow-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-[2px]">
                <div className="w-full h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-[1.9rem] flex items-center justify-center">
                    <img src={logo} alt={`${name} Logo`} className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-md" />
                </div>
            </div>
            <h1 className="text-4xl md:text-6xl text-text-dark dark:text-text-light font-rubik font-bold tracking-tight mb-4">{name}</h1>
            <div className="inline-block px-4 py-1 rounded-full bg-white/30 dark:bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
               <p className="text-sm font-bold text-primary uppercase tracking-widest">{t.heroTagline}</p>
            </div>
            <p className="max-w-2xl mx-auto text-xl text-text-dark/80 dark:text-text-light/80 font-light leading-relaxed glass-card p-6 rounded-2xl border border-white/40">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Before Features Section */}
      {beforeFeaturesContent}

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light font-rubik">
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {t.keyFeatures}
                    </span>
                </h2>
            </div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="flex flex-wrap justify-center gap-8"
            >
                {features.map((feature, index) => (
                    <motion.div key={index} variants={itemVariants} className="w-full max-w-sm flex">
                        <div className="w-full rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 glass-card flex flex-col overflow-hidden">
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-[2px] shadow-md">
                                     <div className="w-full h-full rounded-[14px] overflow-hidden">
                                         <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                                     </div>
                                </div>
                                <h3 className="text-xl font-bold text-center mb-4 text-text-dark dark:text-text-light">{feature.title}</h3>
                                <p className="text-sm text-center leading-relaxed text-text-dark/70 dark:text-text-light/70 flex-grow font-light">{feature.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* Child-specific content (e.g., bonus section) */}
      {children}

      {/* Supported Forums Section */}
      {supportedForums && supportedForums.length > 0 && (
          <section className="py-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl text-text-dark dark:text-text-light sm:text-4xl font-rubik font-bold">{t.supportedForums}</h2>
                  </div>
                  <div className="flex flex-wrap justify-center items-start gap-8">
                      {supportedForums.map((forum, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="flex flex-col items-center"
                          >
                            <a href={forum.url} target="_blank" rel="noopener noreferrer" className="group block">
                               <div className="w-16 h-16 glass rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-white/40">
                                  {forum.icon && <img src={forum.icon} alt={`${forum.name} icon`} className="w-10 h-10 object-contain" />}
                               </div>
                               <p className="text-sm text-text-dark/70 dark:text-text-light/70 text-center mt-3 group-hover:text-primary transition-colors font-medium">{forum.name}</p>
                            </a>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* Installation Section */}
      <section id="installation" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="glass-card p-10 rounded-[3rem] border border-white/50 dark:border-white/10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 text-text-dark dark:text-text-light font-rubik">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {t.installation}
                        </span>
                    </h2>
                    <p className="text-lg mb-10 leading-relaxed text-text-dark/70 dark:text-text-light/70 max-w-2xl mx-auto">{installSection.description}</p>
                    <a href={installSection.chromeStoreUrl} target="_blank" rel="noopener noreferrer">
                        <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto" style={{ background: 'linear-gradient(90deg, rgb(219, 68, 55) 0%, rgb(244, 180, 0) 25%, rgb(15, 157, 88) 50%, rgb(66, 133, 244) 75%, rgb(219, 68, 55) 100%) 0% 0% / 200% 100%', animation: 'chromeGradient 3s linear infinite' }}>
                            <Download className="me-2 -ms-1 h-5 w-5" />
                            {t.chromeWebStore}
                        </button>
                    </a>
                </div>
            </motion.div>
        </div>
      </section>

      {/* Privacy Section */}
      {(privacyPolicyContent || privacyPolicyUrl) && (
        <section id="privacy" className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    {privacyPolicyContent ? (
                        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/40 dark:border-white/10">
                            <h2 className="text-3xl font-bold mb-8 text-text-dark dark:text-text-light text-center font-rubik">{t.privacyPolicy}</h2>
                            <PrivacyPolicyDisplay content={privacyPolicyContent} />
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 inline-flex px-6 py-3 rounded-full backdrop-blur-sm">
                                <Lock className="h-5 w-5 me-2" />
                                <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-dark dark:hover:text-text-light transition-colors font-medium">
                                    {t.privacyPolicy}
                                </a>
                                <ExternalLink className="h-4 w-4 ms-1" />
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
      )}
    </div>
  );
}