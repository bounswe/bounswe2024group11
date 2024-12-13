import { Button } from "@ariakit/react";
import { RiVolumeUpFill } from "@remixicon/react";
import { useSpeech } from "../hooks/useSpeech";
import { buttonClass, buttonInnerRing } from "./button";

export type VoiceoverProps = {
    text: string;
};

export const Voiceover = ({ text }: VoiceoverProps) => {
    const { speak } = useSpeech();
    return (
        <Button
            onClick={() => speak(text)}
            className={buttonClass({
                intent: "secondary",
                size: "medium",
                icon: "only",
            })}
        >
            <span
                className={buttonInnerRing({
                    intent: "secondary",
                })}
                aria-hidden="true"
            />
            <RiVolumeUpFill size={16} />
        </Button>
    );
};
