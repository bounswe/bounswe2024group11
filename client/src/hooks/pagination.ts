import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

type PaginationConfig = {
    totalItems: number;
    defaultPage?: number;
    defaultPerPage?: number;
    perPageOptions?: number[];
};

type PaginationState = {
    currentPage: number;
    perPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    hasPrevious: boolean;
    hasNext: boolean;
};

type PaginationActions = {
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
};

export const usePagination = ({
    totalItems,
    defaultPage = 1,
    defaultPerPage = 10,
    perPageOptions = [5, 10, 20],
}: PaginationConfig): [PaginationState, PaginationActions] => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current values from URL params
    const currentPage = parseInt(
        searchParams.get("page") || defaultPage.toString(),
    );
    const perPage = parseInt(
        searchParams.get("per_page") || defaultPerPage.toString(),
    );

    // Calculate pagination state
    const paginationState = useMemo((): PaginationState => {
        const totalPages = Math.ceil(totalItems / perPage);
        const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

        const startIndex = (validCurrentPage - 1) * perPage;
        const endIndex = Math.min(startIndex + perPage, totalItems);

        return {
            currentPage: validCurrentPage,
            perPage,
            totalPages,
            startIndex,
            endIndex,
            hasPrevious: validCurrentPage > 1,
            hasNext: validCurrentPage < totalPages,
        };
    }, [totalItems, currentPage, perPage]);

    // Define pagination actions
    const paginationActions: PaginationActions = {
        setPage: (page: number) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", page.toString());
            setSearchParams(newParams);
        },

        setPerPage: (newPerPage: number) => {
            if (!perPageOptions.includes(newPerPage)) return;

            const newParams = new URLSearchParams(searchParams);
            newParams.set("per_page", newPerPage.toString());
            newParams.set("page", "1"); // Reset to first page when changing items per page
            setSearchParams(newParams);
        },

        nextPage: () => {
            if (paginationState.hasNext) {
                paginationActions.setPage(paginationState.currentPage + 1);
            }
        },

        previousPage: () => {
            if (paginationState.hasPrevious) {
                paginationActions.setPage(paginationState.currentPage - 1);
            }
        },

        goToFirstPage: () => {
            paginationActions.setPage(1);
        },

        goToLastPage: () => {
            paginationActions.setPage(paginationState.totalPages);
        },
    };

    return [paginationState, paginationActions];
};
