import { useContext } from "react";
import { SpeechContext, SpeechContextType } from "../contexts/speechContext";

export const useSpeech = (): SpeechContextType => {
    const context = useContext(SpeechContext);
    if (!context) {
        throw new Error("useSpeech must be used within a SpeechProvider");
    }
    return context;
};