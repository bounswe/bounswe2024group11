import { Button } from "@ariakit/react";
import { RiVolumeUpFill } from "@remixicon/react";
import { useSpeech } from "../hooks/useSpeech";
import { buttonClass, buttonInnerRing } from "./button";

export type VoiceoverProps = {
    text: string;
    label?: string;
};

export const Voiceover = ({
    text,
    label = "Play voiceover",
}: VoiceoverProps) => {
    const { speak } = useSpeech();
    return (
        <Button
            onClick={() => speak(text)}
            className={buttonClass({
                intent: "secondary",
                size: "medium",
                icon: "only",
                className: "ring-offset-slate-600",
            })}
            aria-label={label}
        >
            <span
                className={buttonInnerRing({
                    intent: "secondary",
                })}
                aria-hidden="true"
            />
            <RiVolumeUpFill size={16} role="img" aria-label="Volume icon" />
        </Button>
    );
};
