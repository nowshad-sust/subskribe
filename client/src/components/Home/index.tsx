import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import ProgramCard from "../ProgramCard/index";
import { StateType } from "../../store/actionTypes";
import { fetchAndSetPrograms } from "../../store/actions";
import Shimmer from "./shimmer";

const Home = () => {
  const { programs, page, loading, hasMore, searchKeyword } = useSelector(
    (state: StateType) => state
  );
  const dispatch = useDispatch();

  const loadFunc = () => {
    if (loading) return;
    dispatch(fetchAndSetPrograms(page, searchKeyword));
  };

  const NotFoundScreen = (
    <Text fontSize="2xl" color="white" mt="10%">
      Opps! We found nothing! <br />
      Try searching again please.
    </Text>
  );

  const programsSection = (
    <Flex
      direction="row"
      wrap="wrap"
      align="flex-start"
      justify="center"
      m="10"
      mb="0"
      pb="10"
    >
      {programs?.length > 0
        ? programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))
        : NotFoundScreen}
    </Flex>
  );

  return (
    <InfiniteScroll
      pageStart={page}
      loadMore={loadFunc}
      hasMore={hasMore}
      initialLoad={false}
      threshold={250}
      loader={<Shimmer key="shimmer-0" />}
    >
      {programsSection}
    </InfiniteScroll>
  );
};

export default Home;
