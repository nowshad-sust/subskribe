import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useWindowSize } from "./useWindowSize";
import { setLimit } from "../store/actions";
import { StateType } from "./../store/actionTypes";

export const useLimitByWindowWidth = () => {
  const dispatch = useDispatch();
  const { width = 0 } = useWindowSize();
  const currentlimit = useSelector((state: StateType) => state.limit);

  useEffect(() => {
    let limit = currentlimit;
    if (width < 767) {
      limit = 10;
    } else if (width < 991) {
      limit = 10;
    } else if (width < 1199) {
      limit = 15;
    } else if (width < 1199) {
      limit = 20;
    }
    dispatch(setLimit(limit));
    // eslint-disable-next-line
  }, []);
};
