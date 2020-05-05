import {
  SET_PROGRAMS,
  SET_SEARCH_KEYWORD,
  SET_PAGE,
  SET_LIMIT,
  SET_LOADING,
  SET_HAS_MORE,
  Action,
  StateType,
} from "./actionTypes";

const init: StateType = {
  programs: [],
  page: 1,
  limit: 15,
  loading: false,
  hasMore: true,
  searchKeyword: "",
};

const reducer = (state: StateType = init, action: Action) => {
  switch (action.type) {
    case SET_PROGRAMS:
      return {
        ...state,
        programs: action.payload,
      };
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
