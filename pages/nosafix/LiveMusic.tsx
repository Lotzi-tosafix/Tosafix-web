
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations/translations';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Play, Pause, Loader, Volume2, VolumeX, Music, ChevronDown, Search, X } from 'lucide-react';
import { useMusicPlayer, Station } from '../../contexts/MusicPlayerContext';

const baseStations = [
    { nameKey: 'kolChaiMusic', streamUrl: 'https://live.kcm.fm/livemusic', logoUrl: 'https://kcm.fm//static/images/fblogo.png', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/1' },
    { nameKey: 'kolPlay', streamUrl: 'https://cdn.cybercdn.live/Kol_Barama/Music/icecast.audio', logoUrl: 'https://upload.wikimedia.org/wikipedia/he/2/2b/%D7%9C%D7%95%D7%92%D7%95_%D7%A7%D7%95%D7%9C_%D7%A4%D7%9C%D7%99%D7%99.png' },
    { nameKey: 'tokerFm', streamUrl: 'https://broadcast.adpronet.com/radio/6060/radio.mp3', logoUrl: 'https://tosafix.42web.io/new-page/%D7%98%D7%95%D7%A7%D7%A8_FM.png' },
    { nameKey: 'jewishRadioNetwork', streamUrl: 'https://stream.jewishradionetwork.com:8000/stream', logoUrl: 'https://play-lh.googleusercontent.com/8NR67WMChMtGwPEAdV6LDnDvftgswEd_Z94TSwkY_derdGcfxglik3AHXkLGUC37PcDo' },
    { nameKey: 'jewishMusicStream', streamUrl: 'https://stream.jewishmusicstream.com:8000/stream', logoUrl: 'https://play-lh.googleusercontent.com/xmVDcArYbsmg8ENX6bCRh_C6fBPzahmlUuDKdgGGIOK2chDjLsoa9_qqfHMICd-ntxU' }
] as const;

const musicVolumeStations = ([
    { nameKey: 'kcm_2', streamUrl: 'https://live.kcm.fm/02/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5156.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/2' },
    { nameKey: 'kcm_3', streamUrl: 'https://live.kcm.fm/03/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7864.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/3' },
    { nameKey: 'kcm_4', streamUrl: 'https://live.kcm.fm/04/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7866.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/4' },
    { nameKey: 'kcm_5', streamUrl: 'https://live.kcm.fm/05/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5162.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/5' },
    { nameKey: 'kcm_6', streamUrl: 'https://live.kcm.fm/06/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5164.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/6' },
    { nameKey: 'kcm_7', streamUrl: 'https://live.kcm.fm/07/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5166.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/7' },
    { nameKey: 'kcm_8', streamUrl: 'https://live.kcm.fm/08/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5168.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/8' },
    { nameKey: 'kcm_9', streamUrl: 'https://live.kcm.fm/09/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5170.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/9' },
    { nameKey: 'kcm_10', streamUrl: 'https://live.kcm.fm/10/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5172.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/10' },
    { nameKey: 'kcm_11', streamUrl: 'https://live.kcm.fm/11/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5174.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/11' },
    { nameKey: 'kcm_12', streamUrl: 'https://live.kcm.fm/12/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5176.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/12' },
    { nameKey: 'kcm_13', streamUrl: 'https://live.kcm.fm/13/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7919.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/13' },
    { nameKey: 'kcm_14', streamUrl: 'https://live.kcm.fm/14/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5181.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/14' },
    { nameKey: 'kcm_15', streamUrl: 'https://live.kcm.fm/15/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7898.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/15' },
    { nameKey: 'kcm_16', streamUrl: 'https://live.kcm.fm/16/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5185.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/16' },
    { nameKey: 'kcm_17', streamUrl: 'https://live.kcm.fm/17/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5187.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/17' },
    { nameKey: 'kcm_19', streamUrl: 'https://live.kcm.fm/19/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5191.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/19' },
    { nameKey: 'kcm_20', streamUrl: 'https://live.kcm.fm/20/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5193.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/20' },
    { nameKey: 'kcm_21', streamUrl: 'https://live.kcm.fm/21/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/8/8057.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/21' },
    { nameKey: 'kcm_22', streamUrl: 'https://live.kcm.fm/22/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5197.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/22' },
    { nameKey: 'kcm_25', streamUrl: 'https://live.kcm.fm/25/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5203.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/25' },
    { nameKey: 'kcm_26', streamUrl: 'https://live.kcm.fm/26/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5205.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/26' },
    { nameKey: 'kcm_27', streamUrl: 'https://live.kcm.fm/27/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5207.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/27' },
    { nameKey: 'kcm_28', streamUrl: 'https://live.kcm.fm/28/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5209.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/28' },
    { nameKey: 'kcm_29', streamUrl: 'https://live.kcm.fm/29/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5211.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/29' },
    { nameKey: 'kcm_30', streamUrl: 'https://live.kcm.fm/30/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5213.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/30' },
    { nameKey: 'kcm_31', streamUrl: 'https://live.kcm.fm/31/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5215.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/31' },
    { nameKey: 'kcm_32', streamUrl: 'https://live.kcm.fm/32/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5217.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/32' },
    { nameKey: 'kcm_33', streamUrl: 'https://live.kcm.fm/33/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5219.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/33' },
    { nameKey: 'kcm_34', streamUrl: 'https://live.kcm.fm/34/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5228.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/34' },
    { nameKey: 'kcm_35', streamUrl: 'https://live.kcm.fm/35/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5345.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/35' },
    { nameKey: 'kcm_39', streamUrl: 'https://live.kcm.fm/39/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/5/5347.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/39' },
    { nameKey: 'kcm_40', streamUrl: 'https://live.kcm.fm/40/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7821.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/40' },
    { nameKey: 'kcm_41', streamUrl: 'https://live.kcm.fm/41/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7937.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/41' },
    { nameKey: 'kcm_42', streamUrl: 'https://live.kcm.fm/42/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7899.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/42' },
    { nameKey: 'kcm_46', streamUrl: 'https://live.kcm.fm/46/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7637.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/46' },
    { nameKey: 'kcm_49', streamUrl: 'https://live.kcm.fm/49/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7837.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/49' },
    { nameKey: 'kcm_51', streamUrl: 'https://live.kcm.fm/51/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7841.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/51' },
    { nameKey: 'kcm_52', streamUrl: 'https://live.kcm.fm/52/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7843.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/52' },
    { nameKey: 'kcm_53', streamUrl: 'https://live.kcm.fm/53/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7845.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/53' },
    { nameKey: 'kcm_54', streamUrl: 'https://live.kcm.fm/54/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7849.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/54' },
    { nameKey: 'kcm_55', streamUrl: 'https://live.kcm.fm/55/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7851.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/55' },
    { nameKey: 'kcm_58', streamUrl: 'https://live.kcm.fm/58/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7857.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/58' },
    { nameKey: 'kcm_59', streamUrl: 'https://live.kcm.fm/59/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7860.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/59' },
    { nameKey: 'kcm_60', streamUrl: 'https://live.kcm.fm/60/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7862.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/60' },
    { nameKey: 'kcm_61', streamUrl: 'https://live.kcm.fm/61/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7869.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/61' },
    { nameKey: 'kcm_62', streamUrl: 'https://live.kcm.fm/62/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7871.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/62' },
    { nameKey: 'kcm_63', streamUrl: 'https://live.kcm.fm/63/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7873.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/63' },
    { nameKey: 'kcm_64', streamUrl: 'https://live.kcm.fm/64/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7875.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/64' },
    { nameKey: 'kcm_65', streamUrl: 'https://live.kcm.fm/65/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7877.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/65' },
    { nameKey: 'kcm_66', streamUrl: 'https://live.kcm.fm/66/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7879.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/66' },
    { nameKey: 'kcm_67', streamUrl: 'https://live.kcm.fm/67/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7881.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/67' },
    { nameKey: 'kcm_68', streamUrl: 'https://live.kcm.fm/68/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7883.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/68' },
    { nameKey: 'kcm_69', streamUrl: 'https://live.kcm.fm/69/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7885.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/69' },
    { nameKey: 'kcm_70', streamUrl: 'https://live.kcm.fm/70/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7902.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/70' },
    { nameKey: 'kcm_72', streamUrl: 'https://live.kcm.fm/72/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7906.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/72' },
    { nameKey: 'kcm_73', streamUrl: 'https://live.kcm.fm/73/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7908.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/73' },
    { nameKey: 'kcm_74', streamUrl: 'https://live.kcm.fm/74/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7910.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/74' },
    { nameKey: 'kcm_75', streamUrl: 'https://live.kcm.fm/75/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7912.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/75' },
    { nameKey: 'kcm_76', streamUrl: 'https://live.kcm.fm/76/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7914.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/76' },
    { nameKey: 'kcm_77', streamUrl: 'https://live.kcm.fm/77/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7923.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/77' },
    { nameKey: 'kcm_78', streamUrl: 'https://live.kcm.fm/78/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7925.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/78' },
    { nameKey: 'kcm_79', streamUrl: 'https://live.kcm.fm/79/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7927.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/79' },
    { nameKey: 'kcm_80', streamUrl: 'https://live.kcm.fm/80/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7962.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/80' },
    { nameKey: 'kcm_82', streamUrl: 'https://live.kcm.fm/82/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/7/7996.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/82' },
    { nameKey: 'kcm_85', streamUrl: 'https://live.kcm.fm/85/hls.m3u8', logoUrl: 'https://kcm.fm/upload/pictures/11/11386.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/85' },
    { nameKey: 'kcm_106', streamUrl: 'https://media.kcm.fm/upload/mp3/Music_News/similak.m3u8?v=4', logoUrl: 'https://kcm.fm/upload/pictures/16/16691.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/106' },
    { nameKey: 'kcm_107', streamUrl: 'https://live.kcm.fm/107', logoUrl: 'https://kcm.fm/upload/pictures/17/17274.jpg', nowPlayingUrl: 'https://kcm.fm/Home/LiveJ/107' },
] as const).slice().sort((a, b) => {
    const aNum = parseInt(a.nameKey.split('_')[1], 10);
    const bNum = parseInt(b.nameKey.split('_')[1], 10);
    return aNum - bNum;
});


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
        <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row-reverse items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center flex-shrink-0">
                <button
                    onClick={togglePlayPause}
                    disabled={!currentlyPlaying || isLoading}
                    className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/50 transform hover:scale-105"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {buttonIcon}
                </button>
                <div className="flex items-center gap-3 bg-white/30 dark:bg-black/20 p-2 rounded-xl backdrop-blur-sm">
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
                        className="w-32 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary"
                        aria-label="Volume control"
                    />
                </div>
            </div>

            <div className="flex-grow min-w-0 text-center h-12 flex flex-col justify-center w-full sm:w-auto">
                <AnimatePresence mode="wait">
                    {nowPlayingInfo ? (
                        <motion.div
                            key={nowPlayingInfo.song}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-lg text-text-dark dark:text-text-light font-bold truncate drop-shadow-sm" title={nowPlayingInfo.song}>
                                {nowPlayingInfo.song}
                            </p>
                            <p className="text-sm text-text-dark/80 dark:text-text-light/80 truncate font-medium" title={nowPlayingInfo.artist}>
                                {nowPlayingInfo.artist}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <p className="text-sm text-text-dark/50 dark:text-text-light/50 font-medium">{t.selectStation}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-start flex-shrink-0" style={{ minWidth: '240px' }}>
                <div className="relative w-16 h-16 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-white/20">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={stationLogo}
                            src={stationLogo}
                            alt={stationName}
                            initial={{ opacity: 0, scale: 1.2 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>
                <div className="text-start min-w-0 flex-grow">
                    <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">{currentlyPlaying ? t.nowPlaying : t.ready}</p>
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={stationName}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-lg font-bold text-text-dark dark:text-text-light truncate"
                        >
                            {stationName}
                        </motion.h2>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const StationCard: React.FC<{ station: Station, isSelected: boolean, isPlaying: boolean, onSelect: (station: Station) => void }> = ({ station, isSelected, isPlaying, onSelect }) => {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div
            className={`group relative w-full aspect-square rounded-[2rem] shadow-lg overflow-hidden cursor-pointer transition-all duration-500 ${isSelected ? 'ring-4 ring-primary shadow-primary/50 scale-105' : 'hover:shadow-xl hover:-translate-y-2 hover:scale-105'}`}
            onClick={() => onSelect(station)}
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${station.logoUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end h-full">
                <h3 
                    className="text-white text-xl font-bold text-center leading-tight drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                >
                    {t[station.nameKey] as string}
                </h3>
                <AnimatePresence>
                {isPlaying && (
                     <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="flex justify-center mt-2"
                     >
                         <span className="inline-block w-2 h-2 bg-primary rounded-full animate-ping"></span>
                     </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const MusicVolumeFolder: React.FC<{ isOpen: boolean, onClick: () => void }> = ({ isOpen, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`relative w-full max-w-2xl mx-auto rounded-3xl bg-black/80 backdrop-blur-xl cursor-pointer shadow-2xl border border-white/10 overflow-hidden group`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <img 
                src="https://kcm.fm/dist/assets/f035866fbe1095dafbd7.png" 
                alt="Music Volume"
                className="w-full h-auto object-contain relative z-10"
            />
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/30 text-white shadow-lg z-20 hover:bg-white/30 transition-colors">
                 <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                 >
                    <ChevronDown size={28} />
                 </motion.div>
            </div>
        </motion.div>
    );
};

const LiveMusic: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const {
        currentlyPlaying,
        isPlaying,
        playStation,
        togglePlayPause,
    } = useMusicPlayer();
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleStationSelect = (station: Station) => {
        if (currentlyPlaying?.streamUrl === station.streamUrl) {
            togglePlayPause();
        } else {
            playStation(station);
        }
    };

    const allStations = [...baseStations, ...musicVolumeStations];
    const filteredStations = allStations.filter(station => 
        (t[station.nameKey] as string).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const folderContainerVariants: Variants = {
        open: {
            height: 'auto',
            opacity: 1,
            transition: {
                type: 'spring',
                duration: 0.7,
                staggerChildren: 0.05,
            }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                duration: 0.4,
            }
        }
    };

    const stationCardVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        },
        closed: {
            opacity: 0,
            y: -20,
            scale: 0.9,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-text-dark dark:text-text-light font-rubik mb-6">
                        <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">{t.liveMusic}</span>
                    </h1>
                    <p className="text-xl text-text-dark/70 dark:text-text-light/70 font-light max-w-2xl mx-auto glass-card p-4 rounded-2xl">{t.liveMusicDescription}</p>
                </header>
                
                <div className="sticky top-24 z-30 -mx-4 px-4 pb-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass-card rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-white/40 dark:border-white/10 max-w-5xl mx-auto backdrop-blur-xl flex flex-col items-center gap-8"
                    >
                        <MainPlayer />
                        
                        <div className="relative w-full max-w-md mx-auto group">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input 
                                type="text" 
                                className="block w-full p-4 ps-12 text-base text-gray-900 border border-gray-200/50 rounded-2xl bg-white/50 dark:bg-black/20 dark:border-gray-700/50 dark:placeholder-gray-400 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-md shadow-inner transition-all outline-none"
                                placeholder={t.searchStations}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                <main className="mt-8">
                    <AnimatePresence mode="wait">
                        {searchQuery ? (
                            <motion.div 
                                key="search-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-wrap justify-center gap-8"
                            >
                                {filteredStations.length > 0 ? (
                                    filteredStations.map(station => (
                                         <motion.div 
                                            key={station.streamUrl}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }} 
                                            animate={{ opacity: 1, scale: 1 }} 
                                            className="w-40 sm:w-48 md:w-56 lg:w-60 aspect-square flex-shrink-0"
                                        >
                                            <StationCard
                                                station={station}
                                                isSelected={currentlyPlaying?.streamUrl === station.streamUrl}
                                                isPlaying={isPlaying && currentlyPlaying?.streamUrl === station.streamUrl}
                                                onSelect={handleStationSelect}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 w-full glass-card rounded-3xl">
                                        <p className="text-2xl text-gray-500 dark:text-gray-400 font-light">{t.noStationsFound}</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                             <motion.div
                                key="default-view"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                             >
                                <motion.div 
                                    layout
                                    className="flex flex-wrap justify-center gap-8"
                                >
                                    {baseStations.map(station => (
                                        <motion.div 
                                            key={station.nameKey} 
                                            layout 
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }} 
                                            transition={{ duration: 0.5 }}
                                            className="w-40 sm:w-48 md:w-56 lg:w-60 aspect-square flex-shrink-0"
                                        >
                                            <StationCard
                                                station={station}
                                                isSelected={currentlyPlaying?.streamUrl === station.streamUrl}
                                                isPlaying={isPlaying && currentlyPlaying?.streamUrl === station.streamUrl}
                                                onSelect={handleStationSelect}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                                
                                <div className="mt-20">
                                    <MusicVolumeFolder isOpen={isFolderOpen} onClick={() => setIsFolderOpen(!isFolderOpen)} />
                                    <AnimatePresence>
                                        {isFolderOpen && (
                                            <motion.div
                                                key="folder-content"
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                                variants={folderContainerVariants}
                                                className="overflow-hidden mt-10"
                                            >
                                                <motion.div
                                                    className="flex flex-wrap justify-center gap-8"
                                                >
                                                    {musicVolumeStations.map((station) => (
                                                        <motion.div
                                                            key={station.streamUrl}
                                                            variants={stationCardVariants}
                                                            className="w-40 sm:w-48 md:w-56 lg:w-60 aspect-square flex-shrink-0"
                                                        >
                                                            <StationCard
                                                                station={station}
                                                                isSelected={currentlyPlaying?.streamUrl === station.streamUrl}
                                                                isPlaying={isPlaying && currentlyPlaying?.streamUrl === station.streamUrl}
                                                                onSelect={handleStationSelect}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default LiveMusic;
