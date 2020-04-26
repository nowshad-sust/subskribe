import {
  SET_PROGRAMS,
  SET_SEARCH_KEYWORD,
  Action,
  StateType,
} from "./actionTypes";

const init: StateType = {
  programs: [],
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

    default:
      return state;
  }
};

export default reducer;
