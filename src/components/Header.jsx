import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack p={"4"} bgColor={"blackAlpha.900"} shadow={"base"} gap={'16'} >
      <Button variant={"unstyled"} color={"white"} fontSize={'xl'}>
        <Link to="/">Home</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"} fontSize={'xl'}>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button variant={"unstyled"} color={"white"} fontSize={'xl'}>
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;
