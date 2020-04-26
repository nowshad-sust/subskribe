import React from "react";
import { Heading, Box } from "@chakra-ui/core";

const Nav = () => {
  return (
    <Box
      position="sticky"
      top="0"
      bgImage="linear-gradient(93deg,rgba(136,123,248,0.4),rgba(113,255,151,0.4))"
      w="100%"
      h="60px"
      p={4}
      color="white"
    >
      <Heading size="lg">Subskribe</Heading>
    </Box>
  );
};

export default Nav;
