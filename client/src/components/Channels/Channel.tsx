import React from "react";
import { ChannelType } from "./types";
import { Tag, Image, Flex, MenuItem } from "@chakra-ui/core";

const Channel = ({ title, slug, icon, favourites }: ChannelType) => {
  return (
    <MenuItem as={Flex}>
      <Flex w="100%" justify="space-between" align="center">
        <Image
          size={"60px"}
          mr="1px"
          mt="1px"
          src={`https://img.reelgood.com/service-logos/${icon}.svg`}
          alt={title}
        />
        <Tag>{favourites}</Tag>
      </Flex>
    </MenuItem>
  );
};

export default React.memo(Channel);
