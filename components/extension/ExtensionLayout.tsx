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
  downloadUrl: string;
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
            <h3 className="text-2xl text-text-dark sm:text-3xl mb-6 font-assistant font-bold text-center">{t.privacyPolicy}</h3>
            <div className="relative bg-white p-6 sm:p-8 rounded-lg shadow-inner border border-gray-200">
                <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto flex gap-2">
                    <button onClick={copyToClipboard} title={t.copyPolicyTooltip} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors">
                        <Copy size={16} />
                        <span className="sr-only">{copyButtonText}</span>
                    </button>
                    <button onClick={downloadAsTxt} title={t.downloadPolicyTooltip} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-600 transition-colors">
                        <FileDown size={16} />
                         <span className="sr-only">{t.download}</span>
                    </button>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed font-sans text-right rtl:text-right ltr:text-left">{content}</pre>
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
  children
}: ExtensionLayoutProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img src={logo} alt={`${name} Logo`} className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-3xl shadow-lg" />
            <h1 className="text-4xl md:text-6xl text-text-dark font-assistant font-bold">{name}</h1>
            <p className="mt-2 text-lg font-medium text-gray-500 font-assistant">{t.heroTagline}</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">{description}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={installSection.chromeStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-text-dark bg-primary hover:bg-primary-hover w-full sm:w-auto font-assistant transition-colors">
                <Download className="me-2 -ms-1 h-5 w-5" /> {t.chromeWebStore}
              </a>
              <a href={installSection.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-primary bg-primary/10 hover:bg-primary/20 w-full sm:w-auto font-assistant transition-colors">
                <Download className="me-2 -ms-1 h-5 w-5" /> {t.manualDownload}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl text-text-dark sm:text-4xl font-assistant font-bold">{t.keyFeatures}</h2>
          </div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-text-dark font-assistant">{feature.title}</h3>
                  <p className="mt-4 text-lg text-gray-600">{feature.description}</p>
                </div>
                <div className="md:w-1/2">
                  <img src={feature.image} alt={feature.title} className="rounded-xl shadow-2xl w-full" />
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
          <section className="py-20 bg-white">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                      <h2 className="text-3xl text-text-dark sm:text-4xl font-assistant font-bold">{t.supportedForums}</h2>
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
                               <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 border border-slate-100">
                                  {forum.icon && <img src={forum.icon} alt={`${forum.name} icon`} className="w-10 h-10 object-contain" />}
                               </div>
                               <p className="text-sm text-slate-600 text-center mt-3 group-hover:text-blue-600 transition-colors font-medium">{forum.name}</p>
                            </a>
                          </motion.div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* Installation and Privacy Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl text-text-dark sm:text-4xl mb-6 font-assistant font-bold">{t.installation}</h2>
            <p className="text-lg text-gray-600 mb-8">{installSection.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <a href={installSection.chromeStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-text-dark bg-primary hover:bg-primary-hover w-full sm:w-auto font-assistant transition-colors">
                    <Download className="me-2 -ms-1 h-5 w-5" /> {t.chromeWebStore}
                </a>
                <a href={installSection.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-primary bg-primary/10 hover:bg-primary/20 w-full sm:w-auto font-assistant transition-colors">
                    <Download className="me-2 -ms-1 h-5 w-5" /> {t.manualDownload}
                </a>
            </div>
            {privacyPolicyContent ? (
                <PrivacyPolicyDisplay content={privacyPolicyContent} />
            ) : privacyPolicyUrl && (
                <div className="mt-16 flex items-center justify-center text-gray-500">
                    <Lock className="h-5 w-5 me-2" />
                    <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-text-dark transition-colors font-assistant">
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