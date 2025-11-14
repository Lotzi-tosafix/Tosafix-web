import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

// The destruction of the Second Temple is dated to the 9th of Av, which corresponds
// approximately to August 4th, 70 CE. We'll use a fixed UTC date for calculation.
// Using 15:00 UTC to approximate 18:00 (6 PM) Jerusalem time.
const destructionDate = new Date(0);
destructionDate.setUTCFullYear(70, 7, 4); // Month 7 is August (0-indexed)
destructionDate.setUTCHours(15, 0, 0, 0);

const calculateTimeSince = () => {
    const now = new Date();
    
    let years = now.getUTCFullYear() - destructionDate.getUTCFullYear();
    let months = now.getUTCMonth() - destructionDate.getUTCMonth();
    let days = now.getUTCDate() - destructionDate.getUTCDate();
    let hours = now.getUTCHours() - destructionDate.getUTCHours();
    let minutes = now.getUTCMinutes() - destructionDate.getUTCMinutes();
    let seconds = now.getUTCSeconds() - destructionDate.getUTCSeconds();

    // Adjust for negative values by borrowing from higher units
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        // Get days in the previous month of the 'now' date
        const daysInLastMonth = new Date(now.getUTCFullYear(), now.getUTCMonth(), 0).getUTCDate();
        days += daysInLastMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return {
        years: years.toString(),
        months: months.toString(),
        days: days.toString(),
        hours: hours.toString(),
        minutes: minutes.toString(),
        seconds: seconds.toString(),
    };
};


const TempleTimerPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [time, setTime] = useState(calculateTimeSince());
  const dragControls = useDragControls();

  const startDrag = (event: React.PointerEvent<HTMLHeadingElement>) => {
    event.preventDefault();
    dragControls.start(event, { snapToCursor: false });
  };

  useEffect(() => {
    const timerUpdateInterval = setInterval(() => {
        setTime(calculateTimeSince());
    }, 1000);

    return () => {
      clearInterval(timerUpdateInterval);
    };
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
          drag
          dragListener={false}
          dragControls={dragControls}
          dragMomentum={false}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          id="popup-container"
          style={containerStyle}
          className="fixed bottom-5 left-5 rounded-lg p-4 shadow-lg z-[1000] max-w-[300px] w-auto text-center text-white touch-none"
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
            <h2 
              onPointerDown={startDrag}
              className="text-base font-bold mb-2.5 leading-tight cursor-move"
            >
              זמן שחלף מאז חורבן בית המקדש
            </h2>
            
            <div className="flex justify-center items-center mb-2.5 flex-row-reverse">
              <div className="flex flex-col items-center mx-2.5">
                <div style={unitValueStyle} className="flex items-center justify-center border-none py-1 px-2 rounded-md text-base font-bold h-6 leading-6 text-center">{time.years}</div>
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