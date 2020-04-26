import React, { useState } from "react";
import { Grid, Skeleton, Spinner } from "@chakra-ui/core";
import InfiniteScroll from "react-infinite-scroller";
import queryString from "query-string";
import axios from "axios";
import ProgramCard from "../ProgramCard/index";
import { ProgramType } from "../ProgramCard/type";

const Home = () => {
  const [programs, setPrograms] = useState<ProgramType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loadFunc = async () => {
    if (loading) return;
    await setLoading(true);
    const {
      data: { data },
    } = await axios.get(
      queryString.stringifyUrl({
        url: "http://localhost:4000/api/v1/programs",
        query: { page: `${page}`, limit: `${10}` },
      })
    );
    setPrograms((p) => [...p, ...data]);
    setPage((p) => p + 1);
    if (data.length === 0) {
      setHasMore(false);
    }
    await setLoading(false);
  };

  const programsSection = (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(4, 1fr)",
        "repeat(6, 1fr)",
      ]}
      autoFlow="row"
      m={8}
      gap={6}
    >
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </Grid>
  );

  const shimmer = (
    <Grid key={0} templateColumns="repeat(6, 1fr)" m={8} mb={0} gap={6}>
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <Skeleton key={i} height="50px" my="10px" w="100%">
          <Spinner />
        </Skeleton>
      ))}
    </Grid>
  );

  return (
    <InfiniteScroll
      pageStart={page}
      loadMore={loadFunc}
      hasMore={hasMore}
      loader={shimmer}
    >
      {programsSection}
    </InfiniteScroll>
  );
};

export default Home;
