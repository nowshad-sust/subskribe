import React, { useState } from "react";
import { Box, Flex, Image, Text, Skeleton, IconButton } from "@chakra-ui/core";
import { useDispatch } from "react-redux";
import { toggleFavorites } from "../../store/actions";
import { logoMap } from "./channelIcons";
import { ProgramType } from "./types";
import "./style.css";

const ProgramCard: React.FunctionComponent<{ program: ProgramType }> = ({
  program,
}) => {
  const {
    id: programId,
    title,
    isFavourite,
    description: { id, content_type: type },
    sources,
  } = program;
  const [loading, setLoading] = useState(true);
  const [favourite, setFavourite] = useState(isFavourite);
  const dispatch = useDispatch();

  const toggleToFavouries = () => {
    dispatch(toggleFavorites(programId));
    setFavourite((current) => !current);
  };

  const imageUrl = `https://img.reelgood.com/content/${
    type === "s" ? "show" : type === "m" ? "movie" : ""
  }/${id}/poster-342.webp`;

  const sourceIcons = sources.map((source: string, index: number) => {
    return (
      <Image
        key={`${source}-${index}`}
        size={["30px", "50px"]}
        mr="1px"
        mt="1px"
        src={`https://img.reelgood.com/service-logos/${
          logoMap[source] || source
        }.svg`}
        alt={source}
      />
    );
  });

  return (
    <Flex width={["100%", "200px"]} m="2">
      <Box
        className="program-box"
        width="100%"
        h="100%"
        bg="blue.500"
        borderWidth="2px"
        rounded="lg"
      >
        <Skeleton isLoaded={!loading}>
          <Image
            className="program-box-image"
            src={imageUrl}
            alt={title}
            fallbackSrc="https://via.placeholder.com/231x347"
            width="100%"
            rounded="lg"
            display="block"
            height="auto"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </Skeleton>

        <Box
          className="program-box-content"
          p="2"
          color="white"
          roundedBottom="lg"
          opacity={[1, 1, 0]}
        >
          <Box mt="1" fontWeight="semibold" as="h6" lineHeight="tight">
            <Text fontSize="15px">{title}</Text>
            <Flex size="100%" justify="center" flexWrap="wrap">
              {sourceIcons}
            </Flex>
            <IconButton
              isRound={true}
              outline="none"
              variant="link"
              icon="star"
              aria-label="add to favourites"
              color={favourite ? "#ffe34b" : "#f2f2f2"}
              onClick={toggleToFavouries}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProgramCard;
