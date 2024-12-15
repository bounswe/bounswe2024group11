import React, { createContext, ReactNode, useContext, useRef } from "react";

type SoundContextType = {
    playSound: (soundName: string) => void;
    addSound: (soundName: string, filePath: string) => void;
    toggleSound: (soundName: string, isEnabled: boolean) => void;
};

const SoundContext = createContext<SoundContextType | null>(null);

type SoundProviderProps = {
    children: ReactNode;
};

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
    const sounds = useRef<Record<string, HTMLAudioElement>>({
        success: new Audio("/sfx/success.wav"),
        true: new Audio("/sfx/true.wav"),
        false: new Audio("/sfx/false.wav"),
    });
    const [enabledSounds, setEnabledSounds] = React.useState<
        Record<string, boolean>
    >({
        success: true,
        true: true,
        false: true,
    });

    const addSound = (soundName: string, filePath: string) => {
        if (!sounds.current[soundName]) {
            const audio = new Audio(filePath);
            sounds.current[soundName] = audio;
            setEnabledSounds((prev) => ({ ...prev, [soundName]: true }));
        }
    };

    const playSound = (soundName: string) => {
        if (enabledSounds[soundName]) {
            const sound = sounds.current[soundName];
            if (sound) {
                sound.currentTime = 0; // Reset sound to the start
                sound.play().catch(() => {
                    console.error(`Playback error for sound: ${soundName}`);
                });
            } else {
                console.warn(`Sound "${soundName}" not found.`);
            }
        }
    };

    const toggleSound = (soundName: string, isEnabled: boolean) => {
        setEnabledSounds((prev) => ({ ...prev, [soundName]: isEnabled }));
    };

    return (
        <SoundContext.Provider value={{ playSound, addSound, toggleSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = (): SoundContextType => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
};
