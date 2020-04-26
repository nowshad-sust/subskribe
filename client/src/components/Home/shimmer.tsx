import React from "react";
import { Flex, Skeleton } from "@chakra-ui/core";

const Shimmer = () => (
  <Flex
    direction="row"
    wrap="wrap"
    align="flex-start"
    justify="space-around"
    m="10"
    mb="0"
    pb="10px"
    key="shimmer-0"
  >
    <Skeleton height="30px" my="10px" w="100%" />
    <Skeleton height="30px" my="10px" w="100%" />
  </Flex>
);

export default Shimmer;
