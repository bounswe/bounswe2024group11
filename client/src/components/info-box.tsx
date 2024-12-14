import { Button } from "@ariakit/react";
import { RiInformation2Fill } from "@remixicon/react";

interface InfoBoxProps {
    show: boolean;
    onClose?: () => void;
    message: string;
}

export const InfoBox = ({ show, onClose, message }: InfoBoxProps) => {
    if (!show) return null;

    return (
        <div className="flex items-center gap-2 rounded-2 bg-yellow-50 px-3 py-2 text-sm ring ring-yellow-950/10">
            <RiInformation2Fill size={16} className="text-yellow-800" />
            <span className="flex-1 text-balance text-sm text-yellow-800">
                {message}
            </span>
            {onClose && (
                <Button
                    className="rounded-2 px-3 py-2 text-sm font-semibold text-yellow-700 hover:text-yellow-900"
                    aria-label="Close the information box"
                    onClick={onClose}
                >
                    OK
                </Button>
            )}
        </div>
    );
};
