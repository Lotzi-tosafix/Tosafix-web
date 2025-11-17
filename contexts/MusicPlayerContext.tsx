import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { translations } from '../translations/translations';

// Defines the structure for a radio station object.
export interface Station {
    nameKey: keyof typeof translations['he'];
    streamUrl: string;
    logoUrl: string;
    metadataUrl?: string;
    metadataType?: 'icecast' | 'shoutcast' | 'kol-chai';
}

// Defines the shape of the context data and functions.
interface MusicPlayerContextType {
    currentlyPlaying: Station | null;
    isPlaying: boolean;
    isLoading: boolean;
    loadingStation: Station | null;
    volume: number;
    isMuted: boolean;
    songInfo: { presenter: string; song: string };
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
    const metadataIntervalRef = useRef<number | null>(null);

    const [currentlyPlaying, setCurrentlyPlaying] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingStation, setLoadingStation] = useState<Station | null>(null);
    const [volume, setVolumeState] = useState<number>(0.75);
    const [isMuted, setIsMutedState] = useState<boolean>(false);
    const [songInfo, setSongInfo] = useState<{ presenter: string; song: string }>({ presenter: '', song: '' });

    // Clears the metadata fetching interval.
    const clearMetadataInterval = () => {
        if (metadataIntervalRef.current) {
            clearInterval(metadataIntervalRef.current);
            metadataIntervalRef.current = null;
        }
    };

    // Fetches and parses metadata for the currently playing station.
    const fetchMetadata = async (station: Station) => {
        if (!station.metadataUrl) {
            setSongInfo({ presenter: '', song: '' });
            return;
        }
        try {
            const response = await fetch(station.metadataUrl, { cache: "no-store" });
            if (!response.ok) throw new Error('Metadata fetch failed with status ' + response.status);
            
            const data = await response.json();
            let song = '';
            let presenter = '';

            if (station.metadataType === 'kol-chai' && Array.isArray(data) && data.length > 0) {
                presenter = data[0].SdarName || '';
                song = data[0].CurrentSong || '';
            } else {
                let title = '';
                if (station.metadataType === 'icecast' && data.icestats?.source?.title) {
                    title = data.icestats.source.title;
                } else if (station.metadataType === 'shoutcast' && data.songtitle) {
                    title = data.songtitle;
                }
                if (title) {
                    const parts = title.split(' - ');
                    if (parts.length >= 2) {
                        presenter = parts[0].trim();
                        song = parts.slice(1).join(' - ').trim();
                    } else {
                        song = title.trim();
                    }
                }
            }

            setSongInfo({ presenter: presenter.trim(), song: song.trim() });
        } catch (error) {
            console.error(`Failed to fetch or parse metadata for ${station.nameKey}:`, error);
            setSongInfo({ presenter: '', song: '' }); // Clear info on error
        }
    };

    // Initialize the Audio element and its event listeners on component mount.
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.preload = "none";
        const audio = audioRef.current;

        const onPlay = () => { setIsPlaying(true); setIsLoading(false); setLoadingStation(null); };
        const onPause = () => { setIsPlaying(false); clearMetadataInterval(); };
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
            clearMetadataInterval();
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
        
        clearMetadataInterval();
        setSongInfo({ presenter: '', song: '' });
        setLoadingStation(station);
        setIsLoading(true);

        if (audioRef.current.src !== station.streamUrl) {
            setCurrentlyPlaying(station);
            audioRef.current.src = station.streamUrl;
            audioRef.current.load();
        }

        if (station.metadataUrl) {
            fetchMetadata(station);
            metadataIntervalRef.current = window.setInterval(() => fetchMetadata(station), 5000);
        }

        audioRef.current.play().catch(e => {
            console.error("Audio playback error:", e);
            setIsLoading(false);
            setLoadingStation(null);
            clearMetadataInterval();
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
        setIsPlaying(false);
        setIsLoading(false);
        setLoadingStation(null);
        setSongInfo({ presenter: '', song: '' });
        clearMetadataInterval();
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
        songInfo,
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