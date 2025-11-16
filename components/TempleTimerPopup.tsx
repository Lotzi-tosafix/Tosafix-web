import React, { useState } from 'react';
import { X, GripHorizontal } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const TempleTimerPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const dragControls = useDragControls();
  const { isHebrew } = useLanguage();

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragControls.start(event);
  };
  
  const iframeUrl = isHebrew 
    ? 'https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-he.html'
    : 'https://lotzi-tosafix.github.io/bezachrenu_es_zion/timer-en.html';
  
  const iframeTitle = isHebrew ? 'טיימר חורבן בית המקדש' : 'Beit HaMikdash Destruction Timer';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.9, x: isHebrew ? 50 : -50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.9, x: isHebrew ? 50 : -50 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed bottom-5 ${isHebrew ? 'right-5' : 'left-5'} z-[1000] w-[330px] h-[215px] group touch-none`}
        >
          {/* The iframe is the main visual component */}
          <iframe
            src={iframeUrl}
            title={iframeTitle}
            width="330"
            height="215"
            className="w-full h-full rounded-lg shadow-2xl overflow-hidden border border-primary/20"
            style={{ border: 'none' }}
          />

          {/* Controls overlay: appears on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {/* Drag Handle at the top */}
            <div 
              onPointerDown={startDrag} 
              className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-20 flex items-center justify-center cursor-move z-20 pointer-events-auto"
            >
              <div className="bg-black/50 backdrop-blur-sm rounded-b-lg p-1 px-3 shadow-lg">
                  <GripHorizontal size={24} className="text-white/80" />
              </div>
            </div>
            
            {/* Close Button */}
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-black/70 transition-all duration-300 z-20 shadow-lg transform hover:scale-110 pointer-events-auto"
              aria-label="Close popup"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TempleTimerPopup;
