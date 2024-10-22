export type Tag = {
  name: string;
  linked_data_id: string;
  description: string;
};

export type StoredTag = {
  id: string;
  name: string;
  linked_data_id: string;
  description: string;
};

export type TagSearchResult = {
  id: string;
  description: string;
};
