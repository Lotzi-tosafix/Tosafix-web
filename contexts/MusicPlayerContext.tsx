import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { translations } from '../translations/translations';

// Defines the structure for a radio station object.
export interface Station {
    nameKey: keyof typeof translations['he'];
    streamUrl: string;
    logoUrl: string;
}

export interface NowPlayingInfo {
    song: string;
    artist: string;
}

// Defines the shape of the context data and functions.
interface MusicPlayerContextType {
    currentlyPlaying: Station | null;
    isPlaying: boolean;
    isLoading: boolean;
    loadingStation: Station | null;
    volume: number;
    isMuted: boolean;
    nowPlayingInfo: NowPlayingInfo | null;
    playStation: (station: Station) => void;
    togglePlayPause: () => void;
    stopStation: () => void;
    setVolume: (volume: number) => void;
    setIsMuted: (muted: boolean) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

// Custom hook for easy access to the music player context.
export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);
    if (!context) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
};

interface MusicPlayerProviderProps {
    children: ReactNode;
}

// Provider component that wraps the app and provides the music player state.
export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pollingIntervalId = useRef<number | null>(null);
    const currentStationRef = useRef<Station | null>(null); // To avoid race conditions
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingStation, setLoadingStation] = useState<Station | null>(null);
    const [volume, setVolumeState] = useState<number>(0.75);
    const [isMuted, setIsMutedState] = useState<boolean>(false);
    const [nowPlayingInfo, setNowPlayingInfo] = useState<NowPlayingInfo | null>(null);

    const clearPolling = () => {
        if (pollingIntervalId.current) {
            clearInterval(pollingIntervalId.current);
            pollingIntervalId.current = null;
        }
        setNowPlayingInfo(null);
    };

    const fetchKolChaiMusicInfo = async () => {
        // Guard against race condition: only fetch if Kol Chai is still the active station.
        if (currentStationRef.current?.nameKey !== 'kolChaiMusic') {
            return;
        }
        try {
            const response = await fetch('https://kcm.fm/Home/LiveJ/1');
            if (!response.ok) {
                console.error('Failed to fetch Kol Chai Music info, status:', response.status);
                setNowPlayingInfo(null);
                return;
            }
            const data = await response.json();
            const playingString = data?.item?.playing;

            if (playingString && typeof playingString === 'string') {
                const parts = playingString.split(' - ');
                const song = parts[0]?.trim() || '';
                const artist = parts.slice(1).join(' - ').trim() || '';
                
                if (song && artist) {
                    setNowPlayingInfo(prevInfo => {
                        if (prevInfo?.song !== song || prevInfo?.artist !== artist) {
                            return { song, artist };
                        }
                        return prevInfo;
                    });
                } else {
                    setNowPlayingInfo(null);
                }
            } else {
                setNowPlayingInfo(null);
            }
        } catch (error) {
            console.error("Error fetching Kol Chai Music info:", error);
            setNowPlayingInfo(null);
        }
    };
    
    const fetchJewishRadioNetworkInfo = async () => {
        if (currentStationRef.current?.nameKey !== 'jewishRadioNetwork') {
            return;
        }
        try {
            const targetUrl = `https://jewishradionetwork.com/system/web/song.json?q=${Date.now()}`;
            // Following the advice provided, using a different proxy to bypass NetFree content filtering.
            const apiUrl = `/api/getSong`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.error('Failed to fetch Jewish Radio Network info from our API, status:', response.status);
                setNowPlayingInfo(null);
                return;
            }
            
            const data = await response.json();
            const song = data?.TITLE?.trim() || '';
            const artist = data?.ARTIST?.trim() || '';

            if (song && artist) {
                setNowPlayingInfo(prevInfo => {
                    if (prevInfo?.song !== song || prevInfo?.artist !== artist) {
                        return { song, artist };
                    }
                    return prevInfo;
                });
            } else {
                setNowPlayingInfo(null);
            }
        } catch (error) {
            console.error("Error fetching Jewish Radio Network info:", error);
            setNowPlayingInfo(null);
        }
    };
    
    const fetchJewishMusicStreamInfo = async () => {
        if (currentStationRef.current?.nameKey !== 'jewishMusicStream') {
            return;
        }
        try {
            const apiUrl = `/api/getJmsSong`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.error('Failed to fetch Jewish Music Stream info from our API, status:', response.status);
                setNowPlayingInfo(null);
                return;
            }
            
            const data = await response.json();
            const song = data?.TITLE?.trim() || '';
            const artist = data?.ARTIST?.trim() || '';

            if (song && artist) {
                setNowPlayingInfo(prevInfo => {
                    if (prevInfo?.song !== song || prevInfo?.artist !== artist) {
                        return { song, artist };
                    }
                    return prevInfo;
                });
            } else {
                setNowPlayingInfo(null);
            }
        } catch (error) {
            console.error("Error fetching Jewish Music Stream info:", error);
            setNowPlayingInfo(null);
        }
    };
    
    // Initialize the Audio element and its event listeners on component mount.
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.preload = "none";
        const audio = audioRef.current;

        const onPlay = () => { setIsPlaying(true); setIsLoading(false); setLoadingStation(null); };
        const onPause = () => setIsPlaying(false);
        const onWaiting = () => setIsLoading(true);
        const onPlaying = () => { setIsLoading(false); setLoadingStation(null); };
        
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('playing', onPlaying);

        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('playing', onPlaying);
            audio.pause();
            clearPolling();
        };
    }, []);
    
    // Effect to update audio volume when state changes.
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    // Function to start playing a new station.
    const playStation = (station: Station) => {
        if (!audioRef.current) return;
        
        clearPolling();
        
        if (station.nameKey === 'kolChaiMusic') {
            fetchKolChaiMusicInfo();
            pollingIntervalId.current = window.setInterval(fetchKolChaiMusicInfo, 5000);
        } else if (station.nameKey === 'jewishRadioNetwork') {
            fetchJewishRadioNetworkInfo();
            pollingIntervalId.current = window.setInterval(fetchJewishRadioNetworkInfo, 5000);
        } else if (station.nameKey === 'jewishMusicStream') {
            fetchJewishMusicStreamInfo();
            pollingIntervalId.current = window.setInterval(fetchJewishMusicStreamInfo, 5000);
        }

        setLoadingStation(station);
        setIsLoading(true);

        if (audioRef.current.src !== station.streamUrl) {
            setCurrentlyPlaying(station);
            currentStationRef.current = station;
            audioRef.current.src = station.streamUrl;
            audioRef.current.load();
        }
        audioRef.current.play().catch(e => {
            console.error("Audio playback error:", e);
            setIsLoading(false);
            setLoadingStation(null);
        });
    };

    // Toggles play/pause for the current station.
    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else if(currentlyPlaying) {
             playStation(currentlyPlaying);
        }
    };
    
    // Stops playback and clears the current station.
    const stopStation = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = '';
        setCurrentlyPlaying(null);
        currentStationRef.current = null;
        setIsPlaying(false);
        setIsLoading(false);
        setLoadingStation(null);
        clearPolling();
    };
    
    // Sets the player volume.
    const setVolume = (newVolume: number) => {
        setVolumeState(newVolume);
        if(newVolume > 0 && isMuted) {
            setIsMutedState(false);
        }
    };
    
    // Toggles the mute state.
    const setIsMuted = (muted: boolean) => {
        setIsMutedState(muted);
    };

    const value = {
        currentlyPlaying,
        isPlaying,
        isLoading,
        loadingStation,
        volume,
        isMuted,
        nowPlayingInfo,
        playStation,
        togglePlayPause,
        stopStation,
        setVolume,
        setIsMuted,
    };

    return (
        <MusicPlayerContext.Provider value={value}>
            {children}
        </MusicPlayerContext.Provider>
    );
};