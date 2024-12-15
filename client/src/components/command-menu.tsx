import {
    RiAB,
    RiAddCircleLine,
    RiAwardLine,
    RiDiscussLine,
    RiHome4Line,
    RiLogoutBoxLine,
    RiResetLeftLine,
    RiTrophyLine,
    RiUserLine,
} from "@remixicon/react";
import { ReactNode } from "react";

export type Command = {
    id: string;
    title: string;
    icon: ReactNode;
    path?: string;
    action?: () => void;
    group: "navigation" | "actions" | "settings" | "application";
    keywords?: string[];
};

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputClass } from "./input";

type CommandMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

const defaultCommands: Command[] = [
    {
        id: "home",
        title: "Home",
        icon: <RiHome4Line className="h-4 w-4" />,
        path: "/",
        group: "navigation",
        keywords: ["dashboard", "main", "home", "feed"],
    },
    {
        id: "quizzes",
        title: "Quizzes",
        icon: <RiAB className="h-4 w-4" />,
        path: "/quizzes",
        group: "navigation",
        keywords: ["quizzes", "quiz"],
    },
    {
        id: "forum",
        title: "Forum",
        icon: <RiDiscussLine className="h-4 w-4" />,
        path: "/forum",
        group: "navigation",
        keywords: ["forum", "forums", "community"],
    },
    {
        id: "achievements",
        title: "Achievements",
        icon: <RiTrophyLine className="h-4 w-4" />,
        path: "/achievements",
        group: "navigation",
        keywords: ["achievements", "trophies", "badges"],
    },
    {
        id: "leaderboard",
        title: "Leaderboard",
        icon: <RiAwardLine className="h-4 w-4" />,
        path: "/leaderboard",
        group: "navigation",
        keywords: ["leaderboard", "rankings", "scoreboard"],
    },
    {
        id: "profile",
        title: "Profile",
        icon: <RiUserLine className="h-4 w-4" />,
        path: "/profile",
        group: "navigation",
        keywords: ["profile", "user", "account"],
    },
    {
        id: "create-quiz",
        title: "Create Quiz",
        icon: <RiAddCircleLine className="h-4 w-4" />,
        path: "/quizzes/new",
        group: "actions",
        keywords: ["create", "new", "start", "quiz", "new quiz"],
    },
    {
        id: "create-forum-question",
        title: "Create Forum Question",
        icon: <RiAddCircleLine className="h-4 w-4" />,
        path: "/forum/new",
        group: "actions",
        keywords: [
            "create",
            "new",
            "start",
            "forum",
            "question",
            "new forum",
            "new question",
            "create question",
            "ask",
        ],
    },

    {
        id: "logout",
        title: "Logout",
        icon: <RiLogoutBoxLine className="h-4 w-4" />,
        path: "/logout",
        group: "application",
        keywords: ["logout", "sign out", "exit"],
    },
    {
        id: "refresh",
        title: "Refresh",
        icon: <RiResetLeftLine className="h-4 w-4" />,
        action: () => {
            window.location.reload();
        },
        group: "application",
        keywords: ["refresh", "reload"],
    },
];

export function CommandMenu({ isOpen, onClose }: CommandMenuProps) {
    const [searchValue, setSearchValue] = useState("");
    const [activeGroupIndex, setActiveGroupIndex] = useState(0);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const menuRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const filteredCommands = useMemo(() => {
        if (!searchValue) return defaultCommands;

        const searchLower = searchValue.toLowerCase();
        return defaultCommands.filter((command) => {
            const titleMatch = command.title
                .toLowerCase()
                .includes(searchLower);
            const keywordMatch = command.keywords?.some((keyword) =>
                keyword.toLowerCase().includes(searchLower),
            );
            return titleMatch || keywordMatch;
        });
    }, [searchValue]);

    const groupedCommands = useMemo(() => {
        const groups: Record<string, Command[]> = {
            navigation: [],
            actions: [],
            settings: [],
            application: [],
        };

        filteredCommands.forEach((command) => {
            groups[command.group].push(command);
        });

        return Object.fromEntries(
            Object.entries(groups).filter(([_, items]) => items.length > 0),
        );
    }, [filteredCommands]);

    const activeGroups = useMemo(() => {
        return Object.entries(groupedCommands);
    }, [groupedCommands]);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setSearchValue("");
            setActiveGroupIndex(0);
            setActiveItemIndex(0);
        }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!activeGroups.length) return;

        const currentGroup = activeGroups[activeGroupIndex][1];

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (activeItemIndex < currentGroup.length - 1) {
                    setActiveItemIndex((prev) => prev + 1);
                } else if (activeGroupIndex < activeGroups.length - 1) {
                    setActiveGroupIndex((prev) => prev + 1);
                    setActiveItemIndex(0);
                }
                break;

            case "ArrowUp":
                e.preventDefault();
                if (activeItemIndex > 0) {
                    setActiveItemIndex((prev) => prev - 1);
                } else if (activeGroupIndex > 0) {
                    setActiveGroupIndex((prev) => prev - 1);
                    const prevGroup = activeGroups[activeGroupIndex - 1][1];
                    setActiveItemIndex(prevGroup.length - 1);
                }
                break;

            case "Enter":
                e.preventDefault();
                const selectedGroup = activeGroups[activeGroupIndex][1];
                const selectedItem = selectedGroup[activeItemIndex];
                if (selectedItem) {
                    handleSelect(selectedItem);
                }
                break;

            case "Escape":
                e.preventDefault();
                onClose();
                break;
        }
    };

    const handleSelect = (command: Command) => {
        onClose();
        if (command.path) {
            navigate(command.path);
        } else if (command.action) {
            command.action();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                role="presentation"
                className="fixed inset-0 z-50 bg-black/50"
                onClick={onClose}
            />

            <div
                ref={menuRef}
                role="dialog"
                aria-modal="true"
                aria-label="Command Menu"
                className="fixed left-1/2 top-[10%] z-50 w-[640px] max-w-[90vw] -translate-x-1/2 overflow-hidden rounded-4 border border-slate-200 bg-white shadow-2xl"
                onKeyDown={handleKeyDown}
            >
                <div className="border-b bg-slate-200 p-3 ring ring-slate-200">
                    <input
                        ref={inputRef}
                        type="text"
                        role="searchbox"
                        aria-label="Search commands"
                        className={inputClass({ className: "w-full" })}
                        placeholder="Type a command or search..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>

                <div
                    ref={listRef}
                    role="listbox"
                    aria-label="Command List"
                    className="flex max-h-[80vh] flex-col gap-4 overflow-y-auto p-4"
                >
                    {activeGroups.map(([group, items], groupIndex) => (
                        <div
                            key={group}
                            role="group"
                            aria-label={group}
                            className="flex flex-col gap-1"
                        >
                            <div className="px-2 py-1 text-xs font-medium uppercase tracking-widest text-slate-500">
                                {group.charAt(0).toUpperCase() + group.slice(1)}
                            </div>
                            {items.map((command, itemIndex) => {
                                const isActive =
                                    groupIndex === activeGroupIndex &&
                                    itemIndex === activeItemIndex;
                                return (
                                    <div
                                        key={command.id}
                                        role="option"
                                        aria-selected={isActive}
                                        className={`rounded-lg flex cursor-pointer items-center gap-2 rounded-1 px-3 py-2 text-slate-700 ${
                                            isActive
                                                ? "bg-slate-700 text-white"
                                                : "hover:bg-slate-50"
                                        }`}
                                        onClick={() => handleSelect(command)}
                                    >
                                        <span className="h-4 w-4 opacity-85">
                                            {command.icon}
                                        </span>
                                        <span className="flex-1 font-medium">
                                            {command.title}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {filteredCommands.length === 0 && (
                        <div className="py-4 text-center text-slate-500">
                            No commands found
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
