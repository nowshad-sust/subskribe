export const SET_PROGRAMS = "SET_PROGRAMS";
export const SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD";
export const SET_PAGE = "SET_PAGE";
export const SET_LIMIT = "SET_LIMIT";
export const SET_LOADING = "SET_LOADING";
export const SET_HAS_MORE = "SET_HAS_MORE";

interface DescriptionType {
  id: string;
  content_type: string;
}

export interface ProgramType {
  id: number;
  title: string;
  slug: string;
  overview: string;
  description: DescriptionType;
  sources: string[];
}

export interface StateType {
  programs: ProgramType[];
  page: number;
  limit: number;
  loading: boolean;
  hasMore: boolean;
  searchKeyword: string;
}

export type Action =
  | { type: typeof SET_PROGRAMS; payload: ProgramType[] }
  | { type: typeof SET_SEARCH_KEYWORD; payload: string }
  | { type: typeof SET_PAGE; payload: number }
  | { type: typeof SET_LIMIT; payload: number }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof SET_HAS_MORE; payload: boolean };
