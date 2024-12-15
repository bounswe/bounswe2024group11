import React, { createContext, ReactNode, useEffect, useRef } from "react";

export type SpeechContextType = {
    speak: (text: string) => void;
};

type SpeechProviderProps = {
    children: ReactNode;
};

export const SpeechContext = createContext<SpeechContextType | null>(null);

export const SpeechProvider: React.FC<SpeechProviderProps> = ({ children }) => {
    const speechRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        speechRef.current = window.speechSynthesis;
        utteranceRef.current = new SpeechSynthesisUtterance();
        utteranceRef.current.lang = "en-US";

        return () => {
            if (speechRef.current) {
                speechRef.current.cancel();
            }
        };
    }, []);

    const speak = (text: string): void => {
        if (speechRef.current && utteranceRef.current) {
            speechRef.current.cancel();
            utteranceRef.current.text = text;
            speechRef.current.speak(utteranceRef.current);
        }
    };

    return (
        <SpeechContext.Provider value={{ speak }}>
            {children}
        </SpeechContext.Provider>
    );
};
