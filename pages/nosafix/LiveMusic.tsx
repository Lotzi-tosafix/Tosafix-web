import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Loader } from 'lucide-react';

// Station data structure
interface Station {
    nameKey: keyof typeof translations['he'];
    streamUrl: string;
    logoUrl: string;
}

const stations: Station[] = [
    { nameKey: 'kolChaiMusic', streamUrl: 'https://live.kcm.fm/livemusic', logoUrl: 'https://kcm.fm/upload/pictures/11/11391.jpg' },
    { nameKey: 'kolPlay', streamUrl: 'https://cdn.cybercdn.live/Kol_Barama/Music/icecast.audio', logoUrl: 'https://tosafix.42web.io/new-page/%D7%A7%D7%95%D7%9C%20%D7%A4%D7%9C%D7%99%D7%99.jfif' },
    { nameKey: 'tokerFm', streamUrl: 'https://broadcast.adpronet.com/radio/6060/radio.mp3', logoUrl: 'https://tosafix.42web.io/new-page/%D7%98%D7%95%D7%A7%D7%A8_FM.png' },
    { nameKey: 'jewishRadioNetwork', streamUrl: 'https://stream.jewishradionetwork.com:8000/stream', logoUrl: 'https://tosafix.42web.io/new-page/jewishradionetwork.jfif' },
    { nameKey: 'jewishMusicStream', streamUrl: 'https://stream.jewishmusicstream.com:8000/stream', logoUrl: 'https://tosafix.42web.io/new-page/jewishmusicstream.jfif' }
];

// Radio Player Component
interface RadioPlayerProps {
    station: Station;
    isPlaying: boolean;
    isLoading: boolean;
    onPlayPause: (station: Station) => void;
}

const RadioPlayer: React.FC<RadioPlayerProps> = ({ station, isPlaying, isLoading, onPlayPause }) => {
    const { language } = useLanguage();
    const t = translations[language];

    const buttonIcon = isLoading ? (
        <Loader className="w-10 h-10 text-black animate-spin" />
    ) : isPlaying ? (
        <Pause className="w-10 h-10 text-black fill-current" />
    ) : (
        <Play className="w-10 h-10 text-black fill-current ml-1" />
    );

    return (
        <motion.div
            className="group relative w-full aspect-square rounded-2xl shadow-lg overflow-hidden cursor-pointer"
            onClick={() => onPlayPause(station)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${station.logoUrl})` }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            {/* Now Playing Glow */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 ring-4 ring-primary ring-opacity-75 rounded-2xl pointer-events-none animate-pulse"
                    />
                )}
            </AnimatePresence>

            {/* Play/Pause Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-white/50 group-hover:scale-105">
                    {buttonIcon}
                </div>
            </div>

            {/* Station Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-bold text-center truncate">{t[station.nameKey]}</h3>
                <AnimatePresence>
                {isPlaying && (
                     <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-primary text-sm font-semibold text-center"
                     >
                        {t.nowPlaying}
                     </motion.p>
                )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

// Main Live Music Page Component
const LiveMusic: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const audioRef = useRef<HTMLAudioElement>(null);

    const [currentlyPlaying, setCurrentlyPlaying] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [loadingStation, setLoadingStation] = useState<Station | null>(null);

    const handlePlayPause = (station: Station) => {
        if (loadingStation) return;

        if (currentlyPlaying?.streamUrl === station.streamUrl && isPlaying) {
            // Pause current station
            audioRef.current?.pause();
        } else {
            // Play new or paused station
            setLoadingStation(station);
            setIsPlaying(false); // Stop showing pause icon on old station immediately
            if (audioRef.current) {
                if (currentlyPlaying?.streamUrl !== station.streamUrl) {
                    audioRef.current.src = station.streamUrl;
                    audioRef.current.load();
                }
                audioRef.current.play().catch(e => {
                    console.error("Audio playback error:", e);
                    setLoadingStation(null);
                });
            }
            setCurrentlyPlaying(station);
        }
    };
    
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => {
            setIsPlaying(true);
            setLoadingStation(null);
        };
        const onPause = () => setIsPlaying(false);
        const onStalled = () => setLoadingStation(currentlyPlaying);
        const onWaiting = () => setLoadingStation(currentlyPlaying);
        const onPlaying = () => setLoadingStation(null);

        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('stalled', onStalled);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('playing', onPlaying);
        
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('stalled', onStalled);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('playing', onPlaying);
        };
    }, [currentlyPlaying]);


    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light">
                        <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">{t.liveMusic}</span>
                    </h1>
                    <p className="mt-4 text-lg text-text-dark/70 dark:text-text-light/70">{t.liveMusicDescription}</p>
                </header>

                <main>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { transition: { staggerChildren: 0.05 } }
                        }}
                    >
                        {stations.map(station => (
                            <motion.div key={station.nameKey} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                                <RadioPlayer
                                    station={station}
                                    isPlaying={isPlaying && currentlyPlaying?.streamUrl === station.streamUrl}
                                    isLoading={loadingStation?.streamUrl === station.streamUrl}
                                    onPlayPause={handlePlayPause}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                    <audio ref={audioRef} preload="none" className="hidden" />
                </main>
            </div>
        </div>
    );
};

export default LiveMusic;