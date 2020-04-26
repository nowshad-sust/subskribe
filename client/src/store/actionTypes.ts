export const SET_PROGRAMS = "SET_PROGRAMS";
export const SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD";

interface DescriptionType {
  id: string;
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
  searchKeyword: string;
}

export type Action =
  | { type: typeof SET_PROGRAMS; payload: ProgramType[] }
  | { type: typeof SET_SEARCH_KEYWORD; payload: string };
