import { createContext, useCallback, useContext, useState } from "react";
import { CommandMenu } from "../components/command-menu";

type CommandMenuContextType = {
    openCommandMenu: () => void;
    closeCommandMenu: () => void;
    isOpen: boolean;
};

const CommandMenuContext = createContext<CommandMenuContextType | undefined>(
    undefined,
);

export function CommandMenuProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const openCommandMenu = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeCommandMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <CommandMenuContext.Provider
            value={{ openCommandMenu, closeCommandMenu, isOpen }}
        >
            {children}
            <CommandMenu isOpen={isOpen} onClose={closeCommandMenu} />
        </CommandMenuContext.Provider>
    );
}

export function useCommandMenu() {
    const context = useContext(CommandMenuContext);
    if (context === undefined) {
        throw new Error(
            "useCommandMenu must be used within a CommandMenuProvider",
        );
    }
    return context;
}
