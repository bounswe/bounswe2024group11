export type SearchPayload = {
	keyword: string;
};

export type SearchResponse = SearchSuccess | SearchError;

export type SearchResult = {
	type: string;
	label: string;
	description: string;
	place: string;
	siteLinks: number;
};

export type SearchSuccess = {
	keyword: string;
	results: Array<SearchResult>;
};

export type SearchError = {
	error: string;
};
