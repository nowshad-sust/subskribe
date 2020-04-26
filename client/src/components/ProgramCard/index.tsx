import React from "react";
import { Box, Image } from "@chakra-ui/core";
import { ProgramType } from "./type";

const ProgramCard: React.FunctionComponent<{ program: ProgramType }> = ({
  program,
}) => {
  const imageUrl = `https://img.reelgood.com/content/movie/${program.description.id}/poster-342.webp`;

  return (
    <Box
      w="100%"
      h="66"
      bg="blue.500"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      <Image
        src={imageUrl}
        alt={program.title}
        fallbackSrc="https://via.placeholder.com/231x347"
        size="100%"
        maxHeight="347px"
      />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {program.title}
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramCard;
