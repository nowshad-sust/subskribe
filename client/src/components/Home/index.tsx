import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import queryString from "query-string";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProgramCard from "../ProgramCard/index";
import { StateType } from "../../store/actionTypes";
import { setPrograms } from "../../store/actions";
import Shimmer from "./shimmer";

const Home = () => {
  const { programs, searchKeyword } = useSelector((state: StateType) => state);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setPage(1);
      await setHasMore(true);
      await dispatch(setPrograms([]));
      // await loadFunc();
    })();
  }, [searchKeyword, dispatch]);

  const loadFunc = async () => {
    if (loading) return;
    await setLoading(true);
    const {
      data: { data },
    } = await axios.get(
      queryString.stringifyUrl({
        url: "http://localhost:4000/api/v1/programs",
        query: {
          page: `${page}`,
          limit: `${10}`,
          ...(searchKeyword && { filter: searchKeyword }),
        },
      })
    );
    await dispatch(setPrograms([...programs, ...data]));
    setPage((p) => p + 1);
    if (data.length === 0) {
      setHasMore(false);
    }
    await setLoading(false);
  };

  const programsSection = (
    <Flex
      direction="row"
      wrap="wrap"
      align="flex-start"
      justify="space-around"
      m="10"
      mb="0"
    >
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </Flex>
  );

  return (
    <InfiniteScroll
      pageStart={page}
      loadMore={loadFunc}
      hasMore={hasMore}
      loader={<Shimmer />}
    >
      {programsSection}
    </InfiniteScroll>
  );
};

export default Home;
