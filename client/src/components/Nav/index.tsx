import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import queryString from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { Heading, Flex, Box, Input } from "@chakra-ui/core";
import { search } from "../../store/actions";

const Nav = () => {
  const { filter = "" } = queryString.parse(useLocation().search) as {
    filter: string;
  };
  const [input, setInput] = useState(filter);
  const [searchKeyword] = useDebounce(input, 500);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchKeyword) {
      history.replace({
        pathname: "",
        search: `?filter=${searchKeyword}`,
      });
    } else {
      history.replace("/");
    }
    dispatch(search(searchKeyword));
  }, [searchKeyword, history, dispatch]);

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
        pl={["10px", "20px"]}
        pr={["10px", "20px"]}
      >
        <Heading
          fontSize={["lg", "xl"]}
          isTruncated
          display={["none", "none", "block"]}
        >
          Subskribe
        </Heading>
        <Heading
          fontSize={["lg", "xl"]}
          display={["block", "block", "none"]}
          mr={2}
        >
          <img
            alt="temp icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEC0lEQVRoge2aX4hVVRTGf3vMHCtpUkbHIij/geBEZUGkSS9FpkRB+KDWQ1BQlEwU9NxbvQQTUT1GEVG+JaEWQdY0UGqBmA3pDEnMlDmThEhZY78e9rnTmTv33BnvPnfuBH5P++6z7rfWt8/e+6y9zoFLmFsIZRGpi4FNwEZgLbASWApcmZmcA04BQ8Ax4EvgQAjhTFkxNAy1XX1E/US94MVjXN2v7lTbWyFgofq8OtJA8EUYUZ9TF86WiK3qUIkCqjGobmmmgHa1t4kCqvG2ekXZIpar386iiAoOqV1liVhhvN2twgl1xXRx1t1+1aVAH7C6lFFpHEPAhhDCL0UGhUKMu0c/cHMTAmsE3xDF/FnrYludP/Yyd0QA3Aq8UnSx5h1RtwJ7mhVRIu4PIeyt7pwiJJtSR4FpF1iLMAisq55itabW08xdERBzuCerOyfdEWO+MwQsL8Hhz8Qd7yRwAVgG3AmsKYF7BFhZtPAxJoCp+El9WJ1X4ONu9WgJfnYUyjRmsSkYUq/L8d2mPqo+YRTQlvUvUvsTfe0rErHYmFanYEvG1aF+VuP6MXVVZnOj+leCr3G1o5aQhxJIVX/1vxF/t47dkZzPPYk+H6hwXZbTsqFwzs0MJ0MI/2TtO+rYdasvAWeAqxN9bgQ+hMlC1iaSXpVrH6L+Fv5Coq8KJmLOP0dSE8M16vVZ+ylgN2Ai53SYiDkvZHEiaRvQq84LIYyFELYBNwA9wF5i8aFsLJnSo55PXHgV7FenTFPjCfNB9b0SfU08EENeCHB5iaP1FfAB8DHwXQhhYpqpq4H3gVsSfZwPIbTDZCGj1LpV5eAUcXd5K4TQn/lbAhwBrk3gHQ0hdMLkNfJbAuF0WAY8DvSpvQAhhDHg9UTesUojL+SHRNKZIAC71E3Z78OJfMcrjbyQgUTSl4FtwBszsK1kwKkl2+8rjbyQvkTSsyGE3cCLwGgdu3PAp1m7O9HnF1N61GtMSxqHzMqd6k3WroP9qN6b2cw3JpGN4m+1dopjfAak4B1z5xB1vbpdfcyYxs/PXXs10deUc3teyM5EctUD6u11fHSrH5XgZ3uet5lH3QHgIPHIC9BFLOmsK4F7mHjUPV9oYSztz3X0VMf9fywHnQC6py0HhRD+AHbNVlQN4JnC6kktqG+2ev7UwGtF8dYrYrcTH5LrL2q8moeDwF1FC3y61wqdRDFlFNVSMEisxJ8qMqhXjSeEcBrYnBG1CoPAPfVEzBhql3q4BWvia3VZ+lhMFrPA2X8Z2rxX1epm43u9ZuG4el/TBFSJaVefVYdLFDCs9tiiLyAWGBPNfTZ2BBhX96o71AUpsZT5UU0Hkz+qWQV0Aosyk7PAaeLxdIB4KPo8hPB7WTFcwlzCvysjZcm0kdpbAAAAAElFTkSuQmCC"
          />
        </Heading>
        <Input
          focusBorderColor="#2196F3"
          color="black"
          size="md"
          maxWidth="400px"
          pl="5px"
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
