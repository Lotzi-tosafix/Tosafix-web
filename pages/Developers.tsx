
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { Code2, Server, FileJson, Check, Copy, Timer, BookUser, Wrench, Github, Scissors, ExternalLink, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const BACKEND_API_URL = 'https://lotzi-fix-remover.hf.space/api/remove-background';

const CopyAction = ({ text, className = "", size = 16 }: { text: string, className?: string, size?: number }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`group/btn relative p-2 rounded-lg transition-all duration-300 active:scale-90 ${copied ? 'bg-green-500/10 text-green-500' : 'bg-white/5 hover:bg-primary/10 text-gray-400 hover:text-primary'} ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
        {copied ? 'Copied!' : 'Copy'}
      </span>
    </button>
  );
};

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
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden relative group my-4 shadow-lg border border-gray-700/50">
      <div className="flex justify-between items-center px-4 py-3 bg-[#252526] border-b border-gray-700/50">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <pre className="p-5 text-sm text-[#D4D4D4] overflow-x-auto font-mono leading-relaxed">
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
  // State to ignore observer updates during smooth scroll
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  const navItems = [
    { id: 'cutfix-api', titleKey: 'cutfixApiTitle', icon: Scissors },
    { id: 'temple-timer', titleKey: 'templeTimerTitle', icon: Timer }
  ];

  // Adjusted rootMargin to create a narrower "active" zone in the middle of the screen
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "-20% 0px -60% 0px"
  };

  const { ref: cutfixRef, inView: cutfixInView } = useInView(observerOptions);
  const { ref: timerRef, inView: timerInView } = useInView(observerOptions);

  useEffect(() => {
    if (isManualScrolling) return;

    if (timerInView) {
      setActiveSection('temple-timer');
    } else if (cutfixInView) {
      setActiveSection('cutfix-api');
    }
  }, [cutfixInView, timerInView, isManualScrolling]);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setIsManualScrolling(true);
    setActiveSection(targetId); // Update immediately on click
    
    const element = document.getElementById(targetId);
    element?.scrollIntoView({
      behavior: 'smooth',
    });

    // Re-enable observer updates after scroll animation finishes (approx 1s)
    setTimeout(() => {
        setIsManualScrolling(false);
    }, 1000);
  };

  const jsCode = `const imageFile = document.querySelector('input[type="file"]').files[0];
const formData = new FormData();
formData.append('file', imageFile);

fetch('${BACKEND_API_URL}', {
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
  ${BACKEND_API_URL} \\
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

  // Structured strings for copy buttons
  const endpointUrl = BACKEND_API_URL;
  const bodyText = `${t.fieldName}: ${t.file}\n${t.fieldDesc}\n${t.supportedFormats}: PNG, JPG/JPEG, WEBP\n${t.fileSizeLimit}: 10MB`;
  const successText = `${t.statusCode}: 200 OK\n${t.contentType}: image/png\n${t.responseBody}: ${t.responseBodyDesc}`;
  const errorText = `400 Bad Request: ${t.error400}\n500 Internal Server Error: ${t.error500}`;

  // Full Documentation Strings
  const cutfixFullDoc = `${t.cutfixApiTitle}
${t.cutfixApiDesc}

${t.endpoint}: ${endpointUrl}
${t.method}: POST

${t.body}:
${bodyText}

${t.successResponse}:
${successText}

${t.errorResponse}:
${errorText}`;

  const timerFullDoc = `${t.templeTimerTitle}
${t.templeTimerDesc}

${t.embedCode}
${t.embedInstructions}

${t.embedAutoTitle}
${t.embedAutoStep1}
<div id="temple-timer-container"></div>

${t.embedAutoStep2}
${autoEmbedScriptCode}

${t.embedManualTitle}
${t.embedManualDesc}

${t.embedManualHe}
${heIframeCode}

${t.embedManualEn}
${enIframeCode}`;

  return (
    <main className="flex-1">
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light mb-4 font-rubik">
                <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">{t.developers}</span>
              </h1>
              <div className="max-w-2xl mx-auto glass-card p-4 rounded-2xl border border-white/40 shadow-sm">
                  <p className="text-base md:text-lg text-text-dark/70 dark:text-text-light/70 leading-relaxed font-light">{t.devIntro}</p>
              </div>
          </motion.div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative">
            {/* Sidebar Navigation */}
            <aside className="hidden md:block w-64 flex-shrink-0 sticky top-28 z-30 self-start transition-all duration-300 ease-in-out">
              <div className="glass-card p-3 rounded-2xl border border-white/30 dark:border-white/10 shadow-xl backdrop-blur-xl bg-white/60 dark:bg-gray-900/60">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 px-3">{t.menu}</h3>
                <div className="space-y-1">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleNavClick(e, item.id)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold transition-all duration-300 group ${
                          isActive
                            ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-sm border border-primary/20 translate-x-1 rtl:-translate-x-1'
                            : 'text-text-dark/70 dark:text-text-light/70 hover:bg-white/40 dark:hover:bg-white/10 hover:text-text-dark dark:hover:text-white'
                        }`}
                      >
                        <Icon size={16} className={`transition-colors ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                        <span>{t[item.titleKey as keyof typeof t] as string}</span>
                        {isActive && (
                            <motion.div 
                                layoutId="activeDot"
                                className="w-1.5 h-1.5 rounded-full bg-primary ms-auto"
                            />
                        )}
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow min-w-0 space-y-12">
              <motion.section
                ref={cutfixRef}
                id="cutfix-api"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card rounded-3xl p-6 md:p-10 border border-white/40 dark:border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                  <div className="flex items-center gap-5 flex-grow">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <Scissors className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">{t.cutfixApiTitle}</h2>
                      <p className="text-base text-text-dark/70 dark:text-text-light/70 font-light">{t.cutfixApiDesc}</p>
                    </div>
                  </div>
                  <CopyAction text={cutfixFullDoc} className="self-start sm:self-center bg-primary/10 text-primary hover:bg-primary/20 p-2.5" size={18} />
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2">
                        <Server size={20} className="text-primary" /> {t.endpoint}
                    </h3>
                    <div className="relative group">
                        <code className="block text-xs bg-white/50 dark:bg-black/30 p-3 rounded-xl text-accent dark:text-primary break-all border border-white/20 font-mono pr-12 rtl:pl-12 rtl:pr-4">
                            {endpointUrl}
                        </code>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2">
                        {t.method}
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="inline-block px-3 py-1 text-xs font-bold text-green-800 bg-green-200 dark:bg-green-900/50 dark:text-green-300 rounded-full shadow-sm border border-green-300/50">POST</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-bold text-text-dark dark:text-text-light flex items-center gap-2">
                            <FileJson size={20} className="text-primary" /> {t.body}
                        </h3>
                    </div>
                    <p className="text-sm text-text-dark/80 dark:text-text-light/80 mb-3 font-light">{t.bodyDesc}</p>
                    <ul className="bg-white/40 dark:bg-black/20 p-4 rounded-2xl space-y-2 border border-white/20 text-sm">
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.fieldName}:</span> <code className="text-xs bg-white/50 dark:bg-white/10 px-2 py-0.5 rounded font-mono">{t.file}</code></li>
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.fieldDesc}</span></li>
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.supportedFormats}:</span> PNG, JPG/JPEG, WEBP</li>
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.fileSizeLimit}:</span> 10MB</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-bold text-text-dark dark:text-text-light">{t.successResponse}</h3>
                    </div>
                    <p className="text-sm text-text-dark/80 dark:text-text-light/80 mb-3 font-light">{t.successResponseDesc}</p>
                    <ul className="bg-white/40 dark:bg-black/20 p-4 rounded-2xl space-y-2 border border-white/20 text-sm">
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.statusCode}:</span> <code className="text-xs bg-white/50 dark:bg-white/10 px-2 py-0.5 rounded font-mono">200 OK</code></li>
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.contentType}:</span> <code className="text-xs bg-white/50 dark:bg-white/10 px-2 py-0.5 rounded font-mono">image/png</code></li>
                      <li className="flex items-center gap-2"><span className="font-bold w-28">{t.responseBody}:</span> {t.responseBodyDesc}</li>
                    </ul>
                  </div>

                   <div>
                    <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-bold text-text-dark dark:text-text-light">{t.errorResponse}</h3>
                    </div>
                    <ul className="bg-red-50/50 dark:bg-red-900/10 p-4 rounded-2xl space-y-2 border border-red-200 dark:border-red-800/30 text-red-800 dark:text-red-200 text-sm">
                      <li className="flex items-start gap-2"><code className="text-xs bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded font-mono font-bold">400 Bad Request:</code> {t.error400}</li>
                      <li className="flex items-start gap-2"><code className="text-xs bg-red-100 dark:bg-red-900/40 px-2 py-0.5 rounded font-mono font-bold">500 Internal Server Error:</code> {t.error500}</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Code2 size={20} className="text-primary" />{t.codeExamples}</h3>
                    
                    <h4 className="text-sm font-bold mt-4 mb-2 text-text-dark dark:text-text-light">{t.jsExample}</h4>
                    <CodeBlock code={jsCode} language="javascript" />
                    
                    <h4 className="text-sm font-bold mt-6 mb-2 text-text-dark dark:text-text-light">{t.curlExample}</h4>
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
                className="glass-card rounded-3xl p-6 md:p-10 border border-white/40 dark:border-white/10"
              >
                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-6">
                    <div className="flex items-center gap-5 flex-grow">
                      <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Timer className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-text-dark dark:text-text-light">{t.templeTimerTitle}</h2>
                        <p className="text-base text-text-dark/70 dark:text-text-light/70 font-light">{t.templeTimerDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-start sm:self-center">
                        <CopyAction text={timerFullDoc} className="bg-primary/10 text-primary hover:bg-primary/20 p-2.5" size={18} />
                        <a 
                        href="https://github.com/Lotzi-tosafix/bezachrenu_es_zion" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-white/50 dark:hover:bg-white/10 transition-all font-bold text-xs text-text-dark dark:text-text-light"
                        >
                        <Github size={16} />
                        {t.viewOnGitHub}
                        </a>
                    </div>
                  </div>


                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-text-dark dark:text-text-light">{t.livePreview}</h3>
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 mt-2 bg-white/40 dark:bg-black/20 p-6 rounded-2xl border border-white/20">
                      <div className="text-center">
                        <h4 className="text-xs font-bold mb-3 text-text-dark/80 dark:text-text-light/80">{t.embedManualHe}</h4>
                        <div className="rounded-xl overflow-hidden shadow-xl border border-white/20 scale-90 sm:scale-100">
                            <iframe
                            src="https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-he.html"
                            width="330"
                            height="215"
                            style={{ border: 'none', overflow: 'hidden' }}
                            title="טיימר חורבן בית המקדש"
                            ></iframe>
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-xs font-bold mb-3 text-text-dark/80 dark:text-text-light/80">{t.embedManualEn}</h4>
                         <div className="rounded-xl overflow-hidden shadow-xl border border-white/20 scale-90 sm:scale-100">
                            <iframe
                            src="https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-en.html"
                            width="330"
                            height="215"
                            style={{ border: 'none', overflow: 'hidden' }}
                            title="Beit HaMikdash Destruction Timer"
                            ></iframe>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Code2 size={20} className="text-primary" /> {t.embedCode}</h3>
                    <p className="text-sm text-text-dark/80 dark:text-text-light/80 mb-4 font-light">{t.embedInstructions}</p>
                    
                    <h4 className="text-sm font-bold mt-4 mb-2 text-text-dark dark:text-text-light">{t.embedAutoTitle}</h4>
                    <p className="text-xs text-text-dark/80 dark:text-text-light/80 mb-2">{t.embedAutoStep1}</p>
                    <CodeBlock code={`<div id="temple-timer-container"></div>`} language="html" />
                    <p className="text-xs text-text-dark/80 dark:text-text-light/80 mt-4 mb-2">{t.embedAutoStep2}</p>
                    <CodeBlock code={autoEmbedScriptCode} language="html" />
                    
                    <h4 className="text-sm font-bold mt-6 mb-2 text-text-dark dark:text-text-light">{t.embedManualTitle}</h4>
                    <p className="text-xs text-text-dark/80 dark:text-text-light/80 mb-2">{t.embedManualDesc}</p>
                    <h5 className="text-xs font-medium mt-4 mb-1 text-text-dark dark:text-text-light">{t.embedManualHe}</h5>
                    <CodeBlock code={heIframeCode} language="html" />
                    <h5 className="text-xs font-medium mt-4 mb-1 text-text-dark dark:text-text-light">{t.embedManualEn}</h5>
                    <CodeBlock code={enIframeCode} language="html" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Wrench size={20} className="text-primary" /> {t.customization}</h3>
                     <p className="text-sm text-text-dark/80 dark:text-text-light/80 p-5 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20 leading-relaxed">{t.customizationDesc}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><BookUser size={20} className="text-primary" /> {t.credits}</h3>
                     <p className="text-sm text-text-dark/80 dark:text-text-light/80 p-5 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20 leading-relaxed">
                      {t.creditsDesc_part1}
                      <a href="https://github.com/kdroidFilter/SecondTempleTimerLibrary" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:text-accent/80 transition-colors">
                        {t.creditsDesc_link}
                      </a>
                      {t.creditsDesc_part2}
                     </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3 text-text-dark dark:text-text-light flex items-center gap-2"><Shield size={20} className="text-primary" /> {t.license}</h3>
                     <p className="text-sm text-text-dark/80 dark:text-text-light/80 p-5 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20">{t.licenseDesc}</p>
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
