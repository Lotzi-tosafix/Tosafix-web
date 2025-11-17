import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Play, Pause, Loader, X } from 'lucide-react';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';

const MiniMusicPlayer: React.FC = () => {
    const { 
        currentlyPlaying, 
        isPlaying, 
        isLoading, 
        togglePlayPause, 
        stopStation 
    } = useMusicPlayer();
    const { isHebrew, language } = useLanguage();
    const t = translations[language];
    const location = useLocation();
    const navigate = useNavigate();

    // Determine if the mini player should be visible
    const isVisible = currentlyPlaying && location.pathname !== '/nosafix/live-music';

    const positionClass = isHebrew ? 'right-5' : 'left-5';
    
    // Animation variants for the "emerge from center and move to corner" effect
    // FIX: Correctly type animationVariants with Variants and ensure all variant properties are functions
    // to resolve type incompatibility when using the `custom` prop.
    const animationVariants: Variants = {
        hidden: (isHebrew: boolean) => ({ 
            opacity: 0, 
            scale: 0.5, 
            y: "50vh",
            x: isHebrew ? "-50vw" : "50vw", // Adjust initial x based on direction
            translateX: "-50%",
            translateY: "-50%"
        }),
        visible: () => ({ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            x: 0,
            translateX: 0,
            translateY: 0,
            transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 }
        }),
        exit: () => ({ 
            opacity: 0, 
            scale: 0.8,
            transition: { duration: 0.2 }
        })
    };
    
    const buttonIcon = isLoading ? (
        <Loader className="w-6 h-6 text-white animate-spin" />
    ) : isPlaying ? (
        <Pause className="w-6 h-6 text-white fill-current" />
    ) : (
        <Play className="w-6 h-6 text-white fill-current ml-1" />
    );

    const handleNavigation = () => {
        navigate('/nosafix/live-music');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={`fixed bottom-5 ${positionClass} z-[1000] w-64 cursor-pointer`}
                    custom={isHebrew}
                    variants={animationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    onClick={handleNavigation}
                >
                    <div className="bg-white/80 dark:bg-bg-dark/80 backdrop-blur-md rounded-xl shadow-2xl border border-primary/30 flex items-center p-3 gap-3">
                        <img 
                            src={currentlyPlaying.logoUrl} 
                            alt={t[currentlyPlaying.nameKey] as string} 
                            className="w-16 h-16 rounded-lg object-cover" 
                        />
                        <div className="flex-grow min-w-0">
                            <p className="font-bold text-text-dark dark:text-text-light truncate">
                                {t[currentlyPlaying.nameKey] as string}
                            </p>
                            <p className="text-sm text-primary">
                                {isPlaying ? t.nowPlaying : ''}
                            </p>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} 
                            className="w-12 h-12 flex-shrink-0 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-colors"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {buttonIcon}
                        </button>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); stopStation(); }}
                        className={`absolute ${isHebrew ? '-left-2 -top-2' : '-right-2 -top-2'} w-7 h-7 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all duration-300 shadow-lg transform hover:scale-110 z-10`}
                        aria-label="Close player"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MiniMusicPlayer;