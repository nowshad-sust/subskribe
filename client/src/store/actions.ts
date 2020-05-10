import axios from "axios";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import queryString from "query-string";
import {
  SET_PROGRAMS,
  SET_SEARCH_KEYWORD,
  SET_PAGE,
  SET_LIMIT,
  SET_LOADING,
  SET_HAS_MORE,
  ProgramType,
  StateType,
} from "./actionTypes";

const tempAuthToken = process.env.REACT_APP_AUTH_TOKEN;

const getPrograms = (page: number, filter: string, limit: number) =>
  axios
    .get(
      queryString.stringifyUrl({
        url: "http://localhost:4000/api/v1/programs",
        query: {
          page: `${page}`,
          limit: `${limit}`,
          ...(filter && { filter }),
        },
      }),
      {
        headers: {
          Authorization: `Bearer ${tempAuthToken}`,
        },
      }
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

  const data = await getPrograms(1, searchKeyword, getState().limit);
  if (data.length === 0) {
    await dispatch(setHasMore(false));
  } else {
    await dispatch(setHasMore(true));
  }

  await dispatch(setPrograms(data));
  await dispatch(setPage(2));
  await dispatch(setLoading(false));
};

export const toggleFavorites = (
  programId: number
): ThunkAction<void, StateType, unknown, Action<string>> => () =>
  axios.post(
    "http://localhost:4000/api/v1/programs/favourites",
    {
      programId,
    },
    {
      headers: {
        Authorization: `Bearer ${tempAuthToken}`,
      },
    }
  );

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
});

export const setLimit = (limit: number) => ({
  type: SET_LIMIT,
  payload: limit,
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
  const data = await getPrograms(page, filter, getState().limit);

  if (data.length === 0) {
    await dispatch(setHasMore(false));
  }

  const newData = page === 1 ? data : [...getState().programs, ...data];

  await dispatch(setPrograms(newData));
  await dispatch(setPage(page + 1));
  await dispatch(setLoading(false));
};
