import { SET_PROGRAMS, SET_SEARCH_KEYWORD, ProgramType } from "./actionTypes";

export const setPrograms = (programs: ProgramType[]) => {
  return {
    type: SET_PROGRAMS,
    payload: programs,
  };
};

export const setSearchKeyword = (searchKeyword: string) => {
  return {
    type: SET_SEARCH_KEYWORD,
    payload: searchKeyword,
  };
};
