import { useMemo } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import apiClient, { SWR_SETTINGS } from "../api";
import { QuizCreate } from "../routes/Quiz/Quiz.schema";

export type Dict = {
    NOUN: {
        word: string;
        id: string;
        description: string;
    }[];
    VERB: {
        word: string;
        id: string;
        description: string;
    }[];
    ADJ: {
        word: string;
        id: string;
        description: string;
    }[];
    ADV: {
        word: string;
        id: string;
        description: string;
    }[];
};

export const useQuizTaggingSearch = (search: string, quiz: QuizCreate) => {
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

    const { data, error, isLoading } = useSWR(cacheKey, fetcher, SWR_SETTINGS);

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

export const useTaggingSearch = (search: string) => {
    const [debouncedSearch] = useDebounce(search, 500);

    const cacheKey = useMemo(() => {
        if (!debouncedSearch) return null;
        return {
            endpoint: "/tagging/",
            search: debouncedSearch,
        };
    }, [debouncedSearch]);

    const fetcher = useMemo(
        () => async () => {
            if (!debouncedSearch) return null;

            const response = await apiClient.get("/tagging/", {
                params: {
                    word: debouncedSearch,
                    lang: "en",
                },
            });
            return response.data;
        },
        [debouncedSearch],
    );

    const { data, error, isLoading } = useSWR(cacheKey, fetcher, SWR_SETTINGS);

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
