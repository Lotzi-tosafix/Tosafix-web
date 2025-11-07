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
        <div className="mt-16 text-left">
            <h3 className="text-2xl text-text-dark dark:text-text-light sm:text-3xl mb-6 font-assistant font-bold text-center">{t.privacyPolicy}</h3>
            <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700">
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
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans text-right rtl:text-right ltr:text-left">{content}</pre>
            </div>
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
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10 dark:opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img src={logo} alt={`${name} Logo`} className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-3xl shadow-lg" />
            <h1 className="text-4xl md:text-6xl text-text-dark dark:text-text-light font-assistant font-bold">{name}</h1>
            <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400 font-assistant">{t.heroTagline}</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">{description}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={scrollToInstallation} className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-text-dark bg-primary hover:bg-primary-hover w-full sm:w-auto font-assistant transition-colors">
                {t.installation}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before Features Section */}
      {beforeFeaturesContent}

      {/* Features Section */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text-dark dark:text-text-light font-assistant">
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
                        <div className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 dark:border-primary/30 flex flex-col">
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 shadow-md">
                                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover rounded-xl" />
                                </div>
                                <h3 className="text-lg font-bold text-center mb-3 text-text-dark dark:text-text-light font-assistant">{feature.title}</h3>
                                <p className="text-sm text-center leading-relaxed text-gray-600 dark:text-gray-300 flex-grow">{feature.description}</p>
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
          <section className="py-20 bg-white dark:bg-bg-dark">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl text-text-dark dark:text-text-light sm:text-4xl font-assistant font-bold">{t.supportedForums}</h2>
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
                               <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-slate-100 dark:border-gray-700">
                                  {forum.icon && <img src={forum.icon} alt={`${forum.name} icon`} className="w-10 h-10 object-contain" />}
                               </div>
                               <p className="text-sm text-slate-600 dark:text-slate-400 text-center mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">{forum.name}</p>
                            </a>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* Installation and Privacy Section */}
      <section id="installation" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl text-text-dark dark:text-text-light sm:text-4xl mb-6 font-assistant font-bold">{t.installation}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{installSection.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <a href={installSection.chromeStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:shadow-xl transition-all duration-300 w-full sm:w-auto font-assistant shadow-lg transform hover:-translate-y-1">
                    <Download className="me-2 -ms-1 h-5 w-5" /> {t.chromeWebStore}
                </a>
            </div>
            {privacyPolicyContent ? (
                <PrivacyPolicyDisplay content={privacyPolicyContent} />
            ) : privacyPolicyUrl && (
                <div className="mt-16 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <Lock className="h-5 w-5 me-2" />
                    <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-dark dark:hover:text-text-light transition-colors font-assistant">
                    {t.privacyPolicy}
                    </a>
                    <ExternalLink className="h-4 w-4 ms-1" />
                </div>
            )}
        </div>
      </section>
    </div>
  );
}