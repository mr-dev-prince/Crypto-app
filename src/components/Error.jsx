import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const Error = ({ message }) => {
  return (
    <Alert
      status={"error"}
      position={"fixed"}
      bottom={"4"}
      w={"container.lg"}
      transform={"translateX(-50%)"}
      left={"50%"}
    >
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default Error;
