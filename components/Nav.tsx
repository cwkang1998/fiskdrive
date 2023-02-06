import React from "react";
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Nav = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="nowrap"
      w="100%"
      h={5}
      mb={8}
      p={8}
    >
      <Flex align="center">
        <Image src="logo.png" alt="logo" objectFit="cover" h={30} />
      </Flex>

      <Box
        display={{ base: "block", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <ConnectButton />
        </Flex>
      </Box>
    </Flex>
  );
};
