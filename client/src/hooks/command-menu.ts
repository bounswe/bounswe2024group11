import { useEffect } from "react";
import { useCommandMenu } from "../contexts/CommandMenuContext";

export const useGlobalCommandMenu = () => {
    const { openCommandMenu } = useCommandMenu();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                openCommandMenu();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [openCommandMenu]);
};
