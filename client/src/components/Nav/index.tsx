import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { Heading, Flex, Box, Input } from "@chakra-ui/core";
import { setSearchKeyword } from "../../store/actions";

const Nav = () => {
  const [input, setInput] = useState("");
  const [searchKeyword] = useDebounce(input, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchKeyword(searchKeyword));
  }, [searchKeyword, dispatch]);

  return (
    <Box
      position="sticky"
      top="0"
      bgImage="linear-gradient(93deg,rgba(136,123,248,0.4),rgba(113,255,151,0.4))"
      bg="black"
      w="100%"
      h="60px"
      color="white"
      zIndex={1}
    >
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        size="100%"
        pl="20px"
        pr="20px"
      >
        <Heading size="lg">Subskribe</Heading>
        <Input
          focusBorderColor="lime"
          color="black"
          width="400px"
          placeholder="Search"
          value={input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setInput(event.target.value)
          }
        />
      </Flex>
    </Box>
  );
};

export default Nav;
