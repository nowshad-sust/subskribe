import React from "react";
import Channel from "./Channel";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/core";

const dummyChannels = [
  {
    title: "Netflix",
    slug: "netflix",
    icon: "netflix",
    favourites: 5,
  },
  {
    title: "Amazon Prime",
    slug: "amazon_prime",
    icon: "amazon_prime",
    favourites: 3,
  },
  {
    title: "Hulu",
    slug: "hulu_plus",
    icon: "hulu",
    favourites: 2,
  },
  {
    title: "HBO",
    slug: "hbo",
    icon: "hbo",
    favourites: 1,
  },
];

const Channels = () => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        color="black"
        bgImage="linear-gradient(93deg,rgba(136,123,248,0.4),rgba(113,255,151,0.4))"
        _hover={{ bg: "gray.100" }}
        _expanded={{ bg: "red.200" }}
        _focus={{ outline: 0 }}
      >
        Your Channels
      </MenuButton>
      <MenuList
        color="black"
        bg="black"
        bgImage="linear-gradient(93deg,rgba(136,123,248,0.4),rgba(113,255,151,0.4))"
        m="0"
        p="0"
      >
        {dummyChannels.map((channel) => (
          <Channel key={channel.slug} {...channel} />
        ))}
      </MenuList>
    </Menu>
  );
};

export default Channels;
