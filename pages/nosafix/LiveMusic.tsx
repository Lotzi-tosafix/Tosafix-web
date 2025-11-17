import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Loader, Volume2, VolumeX, Music } from 'lucide-react';
import { useMusicPlayer, Station } from '../../contexts/MusicPlayerContext';

const stations: Station[] = [
    { nameKey: 'kolChaiMusic', streamUrl: 'https://live.kcm.fm/livemusic', logoUrl: 'https://kcm.fm/upload/pictures/11/11391.jpg' },
    { nameKey: 'kolPlay', streamUrl: 'https://cdn.cybercdn.live/Kol_Barama/Music/icecast.audio', logoUrl: 'https://upload.wikimedia.org/wikipedia/he/2/2b/%D7%9C%D7%95%D7%92%D7%95_%D7%A7%D7%95%D7%9C_%D7%A4%D7%9C%D7%99%D7%99.png' },
    { nameKey: 'tokerFm', streamUrl: 'https://broadcast.adpronet.com/radio/6060/radio.mp3', logoUrl: 'https://tosafix.42web.io/new-page/%D7%98%D7%95%D7%A7%D7%A8_FM.png' },
    { nameKey: 'jewishRadioNetwork', streamUrl: 'https://stream.jewishradionetwork.com:8000/stream', logoUrl: 'https://play-lh.googleusercontent.com/8NR67WMChMtGwPEAdV6LDnDvftgswEd_Z94TSwkY_derdGcfxglik3AHXkLGUC37PcDo' },
    { nameKey: 'jewishMusicStream', streamUrl: 'https://stream.jewishmusicstream.com:8000/stream', logoUrl: 'https://play-lh.googleusercontent.com/xmVDcArYbsmg8ENX6bCRh_C6fBPzahmlUuDKdgGGIOK2chDjLsoa9_qqfHMICd-ntxU' }
];

// Main Player Component
const MainPlayer = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const {
        currentlyPlaying,
        isPlaying,
        loadingStation,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
        togglePlayPause,
        nowPlayingInfo
    } = useMusicPlayer();

    const stationName = currentlyPlaying ? t[currentlyPlaying.nameKey] as string : t.liveMusicDescription;
    const stationLogo = currentlyPlaying ? currentlyPlaying.logoUrl : 'https://files.cdn-files-a.com/uploads/10483955/400_filter_nobg_6916f3f610b79.png';
    const isLoading = !!loadingStation;

    const buttonIcon = isLoading ? (
        <Loader className="w-8 h-8 text-white animate-spin" />
    ) : isPlaying ? (
        <Pause className="w-8 h-8 text-white fill-current" />
    ) : (
        <Play className="w-8 h-8 text-white fill-current ml-1" />
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl max-w-4xl mx-auto shadow-lg backdrop-blur-sm border border-primary/20 flex flex-col sm:flex-row-reverse items-center justify-between gap-4"
        >
            {/* Left/Start Controls */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center flex-shrink-0">
                <button
                    onClick={togglePlayPause}
                    disabled={!currentlyPlaying || isLoading}
                    className="w-16 h-16 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 flex-shrink-0"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {buttonIcon}
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-text-dark dark:text-text-light hover:text-primary transition-colors"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary"
                        aria-label="Volume control"
                    />
                </div>
            </div>

            {/* Center: Song Info */}
            <div className="flex-grow min-w-0 text-center h-12">
                <AnimatePresence>
                    {nowPlayingInfo && (currentlyPlaying?.nameKey === 'kolChaiMusic' || currentlyPlaying?.nameKey === 'jewishRadioNetwork' || currentlyPlaying?.nameKey === 'jewishMusicStream') && (
                        <motion.div
                            key={nowPlayingInfo.song}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-md text-text-dark dark:text-text-light font-semibold truncate" title={nowPlayingInfo.song}>
                                <Music size={14} className="inline -mt-1 me-1.5" />
                                {nowPlayingInfo.song}
                            </p>
                            <p className="text-sm text-text-dark/70 dark:text-text-light/70 truncate" title={nowPlayingInfo.artist}>
                                {nowPlayingInfo.artist}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Right/End: Station Info */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start flex-shrink-0" style={{ minWidth: '220px' }}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={stationLogo}
                        src={stationLogo}
                        alt={stationName}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="w-16 h-16 rounded-lg object-cover shadow-md flex-shrink-0"
                    />
                </AnimatePresence>
                <div className="text-start min-w-0 flex-grow">
                    <p className="text-sm text-primary font-semibold h-5">{currentlyPlaying ? t.nowPlaying : ' '}</p>
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={stationName}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg font-bold text-text-dark dark:text-text-light truncate"
                        >
                            {stationName}
                        </h2 >
                    </AnimatePresence>
                </div>
            </div>

        </motion.div>
    );
};

// Station Card Component
const StationCard: React.FC<{ station: Station, isSelected: boolean, isPlaying: boolean, onSelect: (station: Station) => void }> = ({ station, isSelected, isPlaying, onSelect }) => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <motion.div
            className={`group relative w-full aspect-square rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-shadow duration-300 ${isSelected ? 'glowing-border-animation' : 'hover:shadow-primary/40'}`}
            onClick={() => onSelect(station)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${station.logoUrl})` }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white text-lg font-bold text-center truncate">{t[station.nameKey] as string}</h3>
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
    const {
        currentlyPlaying,
        isPlaying,
        playStation,
        togglePlayPause,
    } = useMusicPlayer();
    
    const handleStationSelect = (station: Station) => {
        if (currentlyPlaying?.streamUrl === station.streamUrl) {
            togglePlayPause();
        } else {
            playStation(station);
        }
    };

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-light">
                        <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">{t.liveMusic}</span>
                    </h1>
                    <p className="mt-4 text-lg text-text-dark/70 dark:text-text-light/70">{t.liveMusicDescription}</p>
                </header>
                
                <MainPlayer />

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
                                <StationCard
                                    station={station}
                                    isSelected={currentlyPlaying?.streamUrl === station.streamUrl}
                                    isPlaying={isPlaying && currentlyPlaying?.streamUrl === station.streamUrl}
                                    onSelect={handleStationSelect}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default LiveMusic;