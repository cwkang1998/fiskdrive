import React, { PropsWithChildren } from "react";
import { Flex } from "@chakra-ui/react";
import { Nav } from "./Nav";

export function Layout({ children, ...others }: PropsWithChildren<{}>) {
  return (
    <Flex
      direction="column"
      align="center"
      maxW={{ xl: "1200px" }}
      m="0 auto"
      {...others}
    >
      <Nav />
      {children}
    </Flex>
  );
}
