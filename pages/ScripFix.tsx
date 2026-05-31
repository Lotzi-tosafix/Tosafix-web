import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  },
  {
    id: 'gemini-netfree',
    titleKey: 'scriptGeminiNetfreeName',
    descKey: 'scriptGeminiNetfreeDesc',
    installUrl: 'https://github.com/Lotzi-tosafix/userscripts/raw/refs/heads/main/Gemini%20NetFree%20Image.user.js',
    icon: 'https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg'
  }
];

export default function ScripFix() {
  const { language } = useLanguage();
  const t = translations[language];
  const [guideCopied, setGuideCopied] = React.useState(false);

  const title = language === 'he' ? 'סקריפיקס - סקריפטים של תוספיקס' : 'Scripfix - Userscripts by Tosafix';
  const description = language === 'he' ? 'אוסף סקריפטים שימושיים מבית תוספיקס, כולל מדריך התקנה של Tampermonkey פשוט וברור.' : 'A collection of useful userscripts by Tosafix, including a clear Tampermonkey installation guide.';

  const handleCopyGuide = () => {
    const isHeb = language === 'he';
    
    const guideText = isHeb ? `# מדריך להתקנת סקריפטים

כדי להשתמש בסקריפטים של משתמשים (Userscripts), עליכם להתקין תחילה תוסף מנהל סקריפטים בדפדפן שלכם. אנו ממליצים על **[Tampermonkey](https://www.tampermonkey.net/)** שהוא התוסף הפופולרי והאמין ביותר בתחום.

## שלבי ההתקנה:
1. **התקינו את התוסף [Tampermonkey](https://www.tampermonkey.net/)** מחנות התוספים של הדפדפן שלכם.
2. **חשוב:** לאחר התקנת התוסף, היכנסו לדף ניהול התוספים (\`chrome://extensions/\`), מצאו את Tampermonkey, לחצו על "פרטים" (Details) והפעילו את האפשרות "אפשר סקריפטים של משתמשים" (Allow user scripts). ללא שלב זה הסקריפטים לא יעבדו! (לחלופין ניתן ללחוץ מקש ימני על סמל התוסף ולבחור ב"ניהול תוספים").
3. **עיברו לטאב הסקריפטים** בדף זה ולחצו על כפתור "התקן סקריפט" תחת הסקריפט הרצוי.
4. **יפתח חלון של Tampermonkey** המציג את קוד הסקריפט. לחצו על "התקן" (Install).
5. **זהו!** הסקריפט מותקן ויפעל אוטומטית באתרים המוגדרים לו. עדכונים לסקריפט יתבצעו באופן אוטומטי דרך התוסף.

---
קרדיט: [סקריפיקס](https://tosafix.vercel.app/scripfix)` 
: `# Userscript Installation Guide

To use userscripts, you first need to install a userscript manager extension in your browser. We recommend **[Tampermonkey](https://www.tampermonkey.net/)**, which is the most popular and reliable extension in this field.

## Installation Steps:
1. **Install the [Tampermonkey](https://www.tampermonkey.net/) extension** from your browser's extension store.
2. **Important:** After installing, go to your browser's extensions management page (\`chrome://extensions/\`), find Tampermonkey, click "Details", and enable the "Allow user scripts" option. Scripts will not work without it! (Alternatively, you can right-click the extension icon and select "Manage extensions").
3. **Return to this page** and click the "Install Script" button under the desired script.
4. **A Tampermonkey window will open** showing the script code. Click "Install".
5. **That's it!** The script is installed and will run automatically on its designated sites. Updates to the script will be handled automatically by the extension.

---
Credit: [ScripFix](https://tosafix.vercel.app/scripfix)`;

    navigator.clipboard.writeText(guideText).then(() => {
      setGuideCopied(true);
      setTimeout(() => setGuideCopied(false), 2000);
    });
  };

  return (
    <main className="flex-1">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
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
                <li>{t.tampermonkeyGuideStep5}</li>
              </ol>

              <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/20">
                <a 
                  href="https://www.tampermonkey.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  {t.installTampermonkey}
                  <ExternalLink size={18} />
                </a>

                <div className="flex items-center gap-1.5 mt-2 sm:mt-0">
                  <span className="text-sm font-medium text-text-dark/60 dark:text-text-light/60">
                    {t.loveGuideText}
                  </span>
                  <div className="relative group flex items-center">
                    <button
                      onClick={handleCopyGuide}
                      aria-label={t.copyAsMarkdown}
                      className={`relative flex items-center justify-center p-2 focus:outline-none transition-all duration-300 ${
                        guideCopied 
                          ? 'text-rose-500 scale-110' 
                          : 'text-text-dark/50 dark:text-text-light/50 hover:text-rose-500 hover:scale-110 active:scale-95'
                      }`}
                    >
                      <div className="relative w-6 h-6 flex items-center justify-center">
                        {/* Copy state - Two overlapping hearts */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${guideCopied ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible">
                            <path 
                              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" 
                              className="origin-center translate-x-[-3px] translate-y-[-3px] scale-[0.85] opacity-50 stroke-[2px]" 
                            />
                            <path 
                              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" 
                              className="origin-center translate-x-[2px] translate-y-[2px] scale-[0.85] stroke-[2.5px]" 
                              style={{ fill: 'var(--tw-bg-opacity, #f3f4f6)' }} // Roughly approximate bg in light mode, but let's just make it background color context aware
                            />
                          </svg>
                        </div>
                        
                        {/* Copied state - solid filled heart */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${guideCopied ? 'scale-110 opacity-100' : 'scale-50 opacity-0'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </div>
                      </div>
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 bg-gray-900/95 dark:bg-white/95 text-white dark:text-gray-900 border border-white/10 dark:border-gray-200 text-[11px] font-semibold py-1 px-3 rounded-lg shadow-xl whitespace-nowrap z-50">
                      {guideCopied ? t.copiedSuccess : t.copyAsMarkdown}
                      <div className="absolute top-full left-1/2 -translate-x-[50%] border-[4px] border-transparent border-t-gray-900/95 dark:border-t-white/95" />
                    </div>
                  </div>
                </div>
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
