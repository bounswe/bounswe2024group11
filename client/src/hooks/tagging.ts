import { useMemo } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import apiClient from "../api";
import { QuizCreate } from "../routes/Quiz/Quiz.schema";

export type Dict = {
    NOUN: {
        id: string;
        description: string;
    }[];
    VERB: {
        id: string;
        description: string;
    }[];
    ADJ: {
        id: string;
        description: string;
    }[];
    ADV: {
        id: string;
        description: string;
    }[];
};

export const useTaggingSearch = (search: string, quiz: QuizCreate) => {
    const [debouncedSearch] = useDebounce(search, 500);

    const cacheKey = useMemo(() => {
        if (!debouncedSearch) return null;
        return {
            endpoint: "/tagging/",
            search: debouncedSearch,
            type: quiz.type % 2,
        };
    }, [debouncedSearch, quiz.type]);

    const fetcher = useMemo(
        () => async () => {
            if (!debouncedSearch) return null; // Don't fetch if search is empty

            const response = await apiClient.get("/tagging/", {
                params: {
                    word: debouncedSearch,
                    lang: quiz.type === 2 ? "tr" : "en",
                },
            });
            return response.data;
        },
        [debouncedSearch, quiz.type],
    );

    const { data, error, isLoading } = useSWR(cacheKey, fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 2000,
        compare: (a, b) => JSON.stringify(a) === JSON.stringify(b),
        shouldRetryOnError: false, // Add this to prevent unnecessary retries
        keepPreviousData: false, // Add this to ensure data is cleared when key changes
    });

    return {
        data,
        error,
        isLoading,
        debouncedSearch,
    } as {
        data: Dict;
        error: any;
        isLoading: boolean;
        debouncedSearch: string;
    };
};
