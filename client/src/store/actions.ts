import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import queryString from "query-string";
import {
  SET_PROGRAMS,
  SET_SEARCH_KEYWORD,
  SET_PAGE,
  SET_LOADING,
  SET_HAS_MORE,
  ProgramType,
  StateType,
} from "./actionTypes";

const limit = 10;

const getPrograms = (page: number, filter: string) =>
  axios
    .get(
      queryString.stringifyUrl({
        url: "http://localhost:4000/api/v1/programs",
        query: {
          page: `${page}`,
          limit: `${limit}`,
          ...(filter && { filter }),
        },
      })
    )
    .then((res) => res.data.data);

export const setSearchKeyword = (searchKeyword: string) => ({
  type: SET_SEARCH_KEYWORD,
  payload: searchKeyword,
});

export const search = (
  searchKeyword: string
): ThunkAction<void, StateType, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  await dispatch(setLoading(true));
  await dispatch(setSearchKeyword(searchKeyword));

  const data = await getPrograms(1, searchKeyword);
  if (data.length === 0) {
    await dispatch(setHasMore(false));
  } else {
    await dispatch(setHasMore(true));
  }

  await dispatch(setPrograms(data));
  await dispatch(setPage(2));
  await dispatch(setLoading(false));
};

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
});

export const setHasMore = (hasMore: boolean) => ({
  type: SET_HAS_MORE,
  payload: hasMore,
});

export const setPrograms = (programs: ProgramType[]) => ({
  type: SET_PROGRAMS,
  payload: programs,
});

export const fetchAndSetPrograms = (
  page: number,
  filter: string
): ThunkAction<void, StateType, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  await dispatch(setLoading(true));
  await dispatch(setSearchKeyword(filter));
  const data = await getPrograms(page, filter);

  if (data.length === 0) {
    await dispatch(setHasMore(false));
  }

  const newData = page === 1 ? data : [...getState().programs, ...data];

  await dispatch(setPrograms(newData));
  await dispatch(setPage(page + 1));
  await dispatch(setLoading(false));
};
