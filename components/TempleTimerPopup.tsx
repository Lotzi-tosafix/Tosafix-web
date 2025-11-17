import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const TempleTimerPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { isHebrew } = useLanguage();

  const iframeUrl = isHebrew
    ? 'https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-he.html'
    : 'https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-en.html';
  
  const iframeTitle = isHebrew ? 'טיימר חורבן בית המקדש' : 'Beit HaMikdash Destruction Timer';

  // Positioning classes based on language
  const containerPositionClass = isHebrew ? 'left-5' : 'right-5';
  
  // Animation properties based on language
  const animationInitial = isHebrew ? { opacity: 0, x: -50 } : { opacity: 0, x: 50 };
  const animationExit = isHebrew ? { opacity: 0, x: -50 } : { opacity: 0, x: 50 };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={`fixed bottom-5 ${containerPositionClass} z-[1000] w-[280px] h-[180px]`}>
          <motion.iframe
            initial={animationInitial}
            animate={{ opacity: 1, x: 0 }}
            exit={animationExit}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            src={iframeUrl}
            title={iframeTitle}
            className="w-full h-full rounded-lg shadow-2xl overflow-hidden"
            style={{ border: 'none' }}
          />
          <button
            onClick={() => setIsVisible(false)}
            className={`absolute ${isHebrew ? '-right-2 -top-2' : '-left-2 -top-2'} w-7 h-7 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all duration-300 shadow-lg transform hover:scale-110 z-10`}
            aria-label="Close popup"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TempleTimerPopup;