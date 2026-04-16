import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import { Terminal, Download, ExternalLink, Info, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const scripts = [
  {
    id: 'nodebb-plus',
    titleKey: 'nodebbPlusName',
    descKey: 'scriptNodebbPlusDesc',
    installUrl: 'https://github.com/Lotzi-tosafix/userscripts/raw/refs/heads/main/NodeBB%20Plus.user.js',
    extensionPath: '/extensions/nodebbplus',
    warningKey: 'scriptNodebbPlusMissingFeatures',
    icon: 'https://lh3.googleusercontent.com/PA9OHC7cPkSpqzJXazStpEvOTHmHLt8Nq3EtZ-1LKbaTZoPset5M3NRizV7VwJKTJ4jtZmCVdfn6425RNUR08dkmSw=s120'
  },
  {
    id: 'gfd',
    titleKey: 'gfdShortName',
    descKey: 'scriptGfdDesc',
    installUrl: 'https://github.com/Lotzi-tosafix/userscripts/raw/refs/heads/main/GitHub%20Friendly%20Downloads.user.js',
    extensionPath: '/extensions/gfd',
    icon: 'https://lh3.googleusercontent.com/r77r2zRyYLfTAWvBLy1zELxTgpCpRziU48cfEexOCC31KvdnettoQ1U58Amvgj6kCErQjX2GGIwe6DYV9SBAG-J03w=s120'
  },
  {
    id: 'markdown-netfree',
    title: 'Markdown Editor in NetFree',
    descKey: 'scriptMarkdownNetfreeDesc',
    installUrl: 'https://github.com/Lotzi-tosafix/userscripts/raw/refs/heads/main/Markdown%20Editor%20in%20NetFree.user.js',
    icon: 'https://netfree.link/img/logo/icon.svg'
  }
];

export default function ScripFix() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <main className="flex-1">
      <div className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-4 rounded-[2rem] glass-card mb-6 shadow-lg border border-white/20">
              <Terminal className="w-12 h-12 text-primary mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.scripfixTitle}</span>
            </h1>
            <div className="max-w-2xl mx-auto glass-card p-5 rounded-3xl border border-white/40 shadow-sm">
              <p className="text-base md:text-lg text-text-dark/70 dark:text-text-light/70 leading-relaxed font-light">
                {t.scripfixIntro}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-6 md:p-10 border border-white/40 dark:border-white/10 shadow-xl mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                <Info size={24} />
              </div>
              <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">{t.tampermonkeyGuideTitle}</h2>
            </div>
            
            <div className="space-y-4 text-text-dark/80 dark:text-text-light/80 leading-relaxed bg-white/30 dark:bg-black/20 p-6 rounded-3xl border border-white/20">
              <p>
                {t.tampermonkeyGuideText1}
                <a href="https://www.tampermonkey.net/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                  {t.tampermonkeyGuideText2}
                </a>
                {t.tampermonkeyGuideText3}
              </p>
              
              <ol className="list-decimal list-inside space-y-3 mt-4 marker:text-primary marker:font-bold">
                <li>{t.tampermonkeyGuideStep1}</li>
                <li>{t.tampermonkeyGuideStep2}</li>
                <li>{t.tampermonkeyGuideStep3}</li>
                <li>{t.tampermonkeyGuideStep4}</li>
              </ol>

              <div className="mt-6 pt-4">
                <a 
                  href="https://www.tampermonkey.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  {t.installTampermonkey}
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            {scripts.map((script, index) => (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                className="glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/40 dark:border-white/10 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-20 h-20 rounded-3xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center p-3 flex-shrink-0 border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform">
                    <img src={script.icon} alt={script.title || (t[script.titleKey as keyof typeof t] as string)} className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-text-dark dark:text-text-light mb-2">
                      {script.title || (t[script.titleKey as keyof typeof t] as string)}
                    </h3>
                    <p className="text-text-dark/70 dark:text-text-light/70 leading-relaxed mb-4">
                      {t[script.descKey as keyof typeof t] as string}
                    </p>
                    
                    {script.warningKey && (
                      <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-2xl border border-amber-200 dark:border-amber-800/30 mb-4 text-sm">
                        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                        <p>{t[script.warningKey as keyof typeof t] as string}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <a 
                        href={script.installUrl}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1"
                      >
                        <Download size={18} />
                        {t.installScript}
                      </a>
                      
                      {script.extensionPath && (
                        <Link 
                          to={script.extensionPath}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-white/10 text-text-dark dark:text-text-light border border-white/20 dark:border-gray-700 rounded-full font-bold hover:bg-white/80 dark:hover:bg-white/20 transition-all hover:-translate-y-1"
                        >
                          <ExternalLink size={18} />
                          {t.goToExtensionPage}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
