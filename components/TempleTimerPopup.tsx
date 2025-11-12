import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inform TypeScript about the global variable from the external script
declare global {
  interface Window {
    SecondTempleTimer: any;
  }
}

const TempleTimerPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState({
    years: '0',
    months: '0',
    days: '0',
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  useEffect(() => {
    if (!window.SecondTempleTimer) {
      console.error("SecondTempleTimer library not loaded.");
      return;
    }

    const updateTimer = () => {
      // Create a new provider instance on each update to get the latest time
      const provider = new window.SecondTempleTimer.Provider();
      setTime({
        years: provider.getActualYears(),
        months: provider.getActualMonths(),
        days: provider.getActualDays(),
        hours: provider.getActualHours(),
        minutes: provider.getActualMinutes(),
        seconds: provider.getActualSeconds(),
      });
    };

    updateTimer(); // Initial call
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  
  const containerStyle: React.CSSProperties = {
    fontFamily: "'Bona Nova SC', Arial, sans-serif",
    backgroundColor: 'rgba(114, 42, 42, 0.5)',
  };
  
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: "url('https://moshelavi.github.io/beit-amikdash/beit%20amikdash%20script/Landing%20page/%D7%91%D7%99%D7%AA%20%D7%94%D7%9E%D7%A7%D7%93%D7%A9.gif')",
    opacity: 0.5,
    filter: 'blur(1px)',
  };
  
  const unitValueStyle: React.CSSProperties = {
    fontFamily: "'Digital-7', Arial, sans-serif",
    backgroundColor: 'rgba(142, 136, 136, 0.5)',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          id="popup-container"
          style={containerStyle}
          className="fixed bottom-5 left-5 rounded-lg p-4 shadow-lg z-[1000] max-w-[300px] w-auto text-center text-white"
        >
          <div 
            id="popup-background" 
            style={backgroundStyle}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 rounded-lg"
          ></div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-red-950/70 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-red-800/90 transition-all duration-300 z-20 shadow-md transform hover:scale-110"
            aria-label="Close popup"
          >
            <X size={16} />
          </button>

          <div id="temple-counter" className="relative z-10">
            <h2 className="text-base font-bold mb-2.5 leading-tight">זמן שחלף מאז חורבן בית המקדש</h2>
            
            <div className="flex justify-center items-center mb-2.5 flex-row-reverse">
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none p-1 rounded-md text-base font-bold min-w-[20px] w-5 h-6 leading-6 text-center">{time.years}</div>
                <div className="text-sm mt-1">שנים</div>
              </div>
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none p-1 rounded-md text-base font-bold min-w-[20px] w-5 h-6 leading-6 text-center">{time.months}</div>
                <div className="text-sm mt-1">חודשים</div>
              </div>
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none p-1 rounded-md text-base font-bold min-w-[20px] w-5 h-6 leading-6 text-center">{time.days}</div>
                <div className="text-sm mt-1">ימים</div>
              </div>
            </div>
 
            <div className="flex justify-center items-center mb-2.5 flex-row-reverse">
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none p-1 rounded-md text-base font-bold min-w-[20px] w-5 h-6 leading-6 text-center">{time.hours}</div>
                <div className="text-sm mt-1">שעות</div>
              </div>
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none p-1 rounded-md text-base font-bold min-w-[20px] w-5 h-6 leading-6 text-center">{time.minutes}</div>
                <div className="text-sm mt-1">דקות</div>
              </div>
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none p-1 rounded-md text-base font-bold min-w-[20px] w-5 h-6 leading-6 text-center">{time.seconds}</div>
                <div className="text-sm mt-1">שניות</div>
              </div>
            </div>
 
            <div className="text-xs font-bold mt-2 uppercase" style={{ fontSize: '12.5px' }}>"והראנו בבניינו ושמחנו בתיקונו"</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TempleTimerPopup;