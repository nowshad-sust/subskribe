import React, { useState } from "react";
import { Box, Flex, Image, Text, Skeleton } from "@chakra-ui/core";
import { ProgramType } from "./type";
import "./style.css";

const ProgramCard: React.FunctionComponent<{ program: ProgramType }> = ({
  program,
}) => {
  const [loading, setLoading] = useState(true);

  const { id, content_type: type } = program.description;
  const imageUrl = `https://img.reelgood.com/content/${
    type === "s" ? "show" : type === "m" ? "movie" : ""
  }/${id}/poster-342.webp`;

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
            alt={program.title}
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
            <Text fontSize="15px">{program.title}</Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProgramCard;
