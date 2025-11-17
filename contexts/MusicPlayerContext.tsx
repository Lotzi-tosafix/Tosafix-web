import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { translations } from '../translations/translations';

// Defines the structure for a radio station object.
export interface Station {
    nameKey: keyof typeof translations['he'];
    streamUrl: string;
    logoUrl: string;
}

// Defines the shape of the context data and functions.
interface MusicPlayerContextType {
    currentlyPlaying: Station | null;
    isPlaying: boolean;
    isLoading: boolean;
    loadingStation: Station | null;
    volume: number;
    isMuted: boolean;
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
    const [currentlyPlaying, setCurrentlyPlaying] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingStation, setLoadingStation] = useState<Station | null>(null);
    const [volume, setVolumeState] = useState<number>(0.75);
    const [isMuted, setIsMutedState] = useState<boolean>(false);

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
        
        setLoadingStation(station);
        setIsLoading(true);

        if (audioRef.current.src !== station.streamUrl) {
            setCurrentlyPlaying(station);
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
        setIsPlaying(false);
        setIsLoading(false);
        setLoadingStation(null);
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
