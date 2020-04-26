import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/core";
import { ProgramType } from "./type";
import "./style.css";

const ProgramCard: React.FunctionComponent<{ program: ProgramType }> = ({
  program,
}) => {
  const imageUrl = `https://img.reelgood.com/content/movie/${program.description.id}/poster-342.webp`;

  return (
    <Flex width="200px" m="2">
      <Box
        className="program-box"
        width="100%"
        h="100%"
        bg="blue.500"
        borderWidth="2px"
        rounded="lg"
      >
        <Image
          className="program-box-image"
          src={imageUrl}
          alt={program.title}
          fallbackSrc="https://via.placeholder.com/231x347"
          width="100%"
          rounded="lg"
          display="block"
          height="auto"
        />

        <Box
          className="program-box-content"
          p="2"
          color="white"
          roundedBottom="lg"
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
