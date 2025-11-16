import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { Code2, Server, FileJson, Check, Copy, Timer, BookUser, Wrench, Github, Scissors, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);
  const { language: currentLang } = useLanguage();
  const t = translations[currentLang];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden relative group my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};


export default function Developers() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language];
  const [activeSection, setActiveSection] = useState('cutfix-api');
  const location = useLocation();

  const navItems = [
    { id: 'cutfix-api', titleKey: 'cutfixApiTitle', icon: Scissors },
    { id: 'temple-timer', titleKey: 'templeTimerTitle', icon: Timer }
  ];

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "-80px 0px -50% 0px" // Adjust to account for sticky header
  };

  const { ref: cutfixRef, inView: cutfixInView } = useInView(observerOptions);
  const { ref: timerRef, inView: timerInView } = useInView(observerOptions);

  useEffect(() => {
    if (timerInView) {
      setActiveSection('temple-timer');
    } else if (cutfixInView) {
      setActiveSection('cutfix-api');
    }
  }, [cutfixInView, timerInView]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    element?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const jsCode = `const imageFile = document.querySelector('input[type="file"]').files[0];
const formData = new FormData();
formData.append('file', imageFile);

fetch('https://lotzi-fix-remover.hf.space/api/remove-background', {
  method: 'POST',
  body: formData,
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.blob();
})
.then(imageBlob => {
  // Create a URL for the blob
  const imageUrl = URL.createObjectURL(imageBlob);
  // You can now use this URL, e.g., set it as the src of an <img> tag
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  document.body.appendChild(imageElement);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});`;

  const curlCode = `curl -X POST \\
  -F "file=@/path/to/your/image.jpg" \\
  https://lotzi-fix-remover.hf.space/api/remove-background \\
  --output processed_image.png`;
  
  const autoEmbedScriptCode = `<script>
    (function() {
        // --- הגדרות ---
        const hebrewUrl = 'https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-he.html';
        const englishUrl = 'https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-en.html';
        const containerId = 'temple-timer-container';
        
        // --- לוגיקת זיהוי שפה ויצירת האייפרם ---
        const userLang = navigator.language || navigator.userLanguage; 
        const isHebrew = userLang.toLowerCase().startsWith('he');
        
        const iframeUrl = isHebrew ? hebrewUrl : englishUrl;
        const title = isHebrew ? 'טיימר חורבן בית המקדש' : 'Beit HaMikdash Destruction Timer';
        
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', iframeUrl);
        iframe.setAttribute('width', '330');
        iframe.setAttribute('height', '215');
        iframe.setAttribute('title', title);
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        
        const container = document.getElementById(containerId);
        if (container) {
            container.appendChild(iframe);
        } else {
            console.error('Temple Timer container with ID "' + containerId + '" was not found.');
        }
    })();
</script>`;
  
  const heIframeCode = `<iframe 
  src="https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-he.html" 
  width="330" 
  height="215" 
  style="border:none; overflow:hidden;" 
  title="טיימר חורבן בית המקדש">
</iframe>`;

  const enIframeCode = `<iframe 
  src="https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-en.html" 
  width="330" 
  height="215" 
  style="border:none; overflow:hidden;" 
  title="Beit HaMikdash Destruction Timer">
</iframe>`;

  return (
    <main className="flex-1">
      <div className="min-h-screen bg-gradient-to-b from-bg-light to-white dark:from-bg-dark dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center pt-20"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light mb-6 font-assistant">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">{t.developers}</span>
              </h1>
              <p className="text-xl text-text-dark/70 dark:text-text-light/70 max-w-3xl mx-auto leading-relaxed">{t.devIntro}</p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-12 py-12">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-2">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 border-s-2 ${
                        isActive
                          ? 'bg-primary/10 text-primary border-primary'
                          : 'text-text-dark/70 dark:text-text-light/70 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-accent'
                      }`}
                    >
                      <Icon size={18} />
                      {/* FIX: Cast dynamic translation lookup to string to resolve type error. */}
                      <span>{t[item.titleKey as keyof typeof t] as string}</span>
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow min-w-0 space-y-16">
              <motion.section
                ref={cutfixRef}
                id="cutfix-api"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 md:p-10 shadow-lg border border-primary/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-secondary to-accent rounded-lg">
                    <Scissors className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-text-dark dark:text-text-light">{t.cutfixApiTitle}</h2>
                    <p className="text-md text-text-dark/70 dark:text-text-light/70">{t.cutfixApiDesc}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Server size={20} /> {t.endpoint}</h3>
                    <code className="block text-sm bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg text-accent dark:text-primary break-all">https://lotzi-fix-remover.hf.space/api/remove-background</code>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light">{t.method}</h3>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-800 bg-green-200 dark:bg-green-700 dark:text-green-100 rounded-full">POST</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><FileJson size={20} /> {t.body}</h3>
                    <p className="text-text-dark/80 dark:text-text-light/80 mb-2">{t.bodyDesc}</p>
                    <ul className="list-disc list-inside bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg space-y-2">
                      <li><strong>{t.fieldName}:</strong> <code className="text-sm bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">{t.file}</code></li>
                      <li><strong>{t.fieldDesc}</strong></li>
                      <li><strong>{t.supportedFormats}:</strong> PNG, JPG/JPEG, WEBP</li>
                      <li><strong>{t.fileSizeLimit}:</strong> 10MB</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light">{t.successResponse}</h3>
                    <p className="text-text-dark/80 dark:text-text-light/80 mb-2">{t.successResponseDesc}</p>
                    <ul className="list-disc list-inside bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg space-y-2">
                      <li><strong>{t.statusCode}:</strong> <code className="text-sm bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">200 OK</code></li>
                      <li><strong>{t.contentType}:</strong> <code className="text-sm bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">image/png</code></li>
                      <li><strong>{t.responseBody}:</strong> {t.responseBodyDesc}</li>
                    </ul>
                  </div>

                   <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light">{t.errorResponse}</h3>
                    <ul className="list-disc list-inside bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg space-y-2">
                      <li><code className="text-sm bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">400 Bad Request:</code> {t.error400}</li>
                      <li><code className="text-sm bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">500 Internal Server Error:</code> {t.error500}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Code2 size={20} />{t.codeExamples}</h3>
                    
                    <h4 className="font-semibold mt-4 mb-1 text-text-dark dark:text-text-light">{t.jsExample}</h4>
                    <CodeBlock code={jsCode} language="javascript" />
                    
                    <h4 className="font-semibold mt-6 mb-1 text-text-dark dark:text-text-light">{t.curlExample}</h4>
                    <CodeBlock code={curlCode} language="bash" />
                  </div>
                </div>
              </motion.section>

              <motion.section
                ref={timerRef}
                id="temple-timer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white dark:bg-gray-800/50 rounded-2xl p-8 md:p-10 shadow-lg border border-primary/20"
              >
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-red-600 rounded-lg flex-shrink-0">
                        <Timer className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-text-dark dark:text-text-light">{t.templeTimerTitle}</h2>
                        <p className="text-md text-text-dark/70 dark:text-text-light/70">{t.templeTimerDesc}</p>
                      </div>
                    </div>
                    <a 
                      href="https://github.com/Lotzi-tosafix/bezachrenu_es_zion" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 rounded-md border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0 text-text-dark dark:text-text-light"
                    >
                      <Github size={16} />
                      {t.viewOnGitHub}
                    </a>
                  </div>


                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light">{t.liveDemos}</h3>
                    <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 justify-center items-center bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
                       <a href="https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-he.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 underline transition-colors">
                         {t.liveDemoHe}
                         <ExternalLink size={14} />
                       </a>
                       <a href="https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-en.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 underline transition-colors">
                         {t.liveDemoEn}
                         <ExternalLink size={14} />
                       </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Code2 size={20} /> {t.embedCode}</h3>
                    <p className="text-text-dark/80 dark:text-text-light/80 mb-4">{t.embedInstructions}</p>
                    
                    <h4 className="font-semibold mt-4 mb-2 text-text-dark dark:text-text-light">{t.embedAutoTitle}</h4>
                    <p className="text-sm text-text-dark/80 dark:text-text-light/80 mb-2">{t.embedAutoStep1}</p>
                    <CodeBlock code={`<div id="temple-timer-container"></div>`} language="html" />
                    <p className="text-sm text-text-dark/80 dark:text-text-light/80 mt-4 mb-2">{t.embedAutoStep2}</p>
                    <CodeBlock code={autoEmbedScriptCode} language="html" />
                    
                    <h4 className="font-semibold mt-6 mb-2 text-text-dark dark:text-text-light">{t.embedManualTitle}</h4>
                    <p className="text-sm text-text-dark/80 dark:text-text-light/80 mb-2">{t.embedManualDesc}</p>
                    <h5 className="font-medium mt-4 mb-1 text-text-dark dark:text-text-light">{t.embedManualHe}</h5>
                    <CodeBlock code={heIframeCode} language="html" />
                    <h5 className="font-medium mt-4 mb-1 text-text-dark dark:text-text-light">{t.embedManualEn}</h5>
                    <CodeBlock code={enIframeCode} language="html" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Wrench size={20} /> {t.customization}</h3>
                     <p className="text-text-dark/80 dark:text-text-light/80 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">{t.customizationDesc}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><BookUser size={20} /> {t.credits}</h3>
                     <p className="text-text-dark/80 dark:text-text-light/80 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                      {t.creditsDesc_part1}
                      <a href="https://github.com/kdroidFilter/SecondTempleTimerLibrary" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80 transition-colors">
                        {t.creditsDesc_link}
                      </a>
                      {t.creditsDesc_part2}
                     </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><BookUser size={20} /> {t.license}</h3>
                     <p className="text-text-dark/80 dark:text-text-light/80 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">{t.licenseDesc}</p>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}