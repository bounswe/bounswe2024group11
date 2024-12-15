import * as Ariakit from "@ariakit/react";
import { RiArrowUpSLine } from "@remixicon/react";
import { ReactNode, useState } from "react";

export const Collapsible = ({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="py-1">
            <Ariakit.DisclosureProvider
                open={isExpanded}
                setOpen={setIsExpanded}
            >
                <Ariakit.Disclosure
                    className="flex w-full items-center justify-between rounded-1 bg-white px-3 py-3 text-left font-medium transition-colors hover:bg-slate-100"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {title}
                    {
                        <RiArrowUpSLine
                            className="transition-all duration-500 ease-expo-out"
                            style={{
                                transform: isExpanded
                                    ? "rotate(180deg)"
                                    : "rotate(0deg)",
                            }}
                            size={16}
                        />
                    }
                </Ariakit.Disclosure>
                <Ariakit.DisclosureContent
                    className="animate-height py-2 pl-4"
                    style={{
                        maxHeight: isExpanded ? "100%" : "0",
                    }}
                >
                    {children}
                </Ariakit.DisclosureContent>
            </Ariakit.DisclosureProvider>
        </div>
    );
};
