import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import {
  Container,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";
import Error from "./Error";

const Exchanges = () => {
  // useState hook here works like a box that stores something for the time being and you can come back later to see what's inside it;
  // here we are creating a variable(box), i.e, {exchanges} that initially keeps an empty array, but whenever we want to change the value we can call the function setExchanges with the data that we want to keep in the box {exchanges}, and it changes the empty array into the array of the data that was passed through the function;

  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);

  // useEffect hook here is used to perform certain task when certain values change;
  // for example let's say that you want to turn on the fan whenever the lights in the room are turned off then useEffect can be used as an assistant that keeps watching the light. whenever the lights are turned off the assistant will turn on the fan for you;

  // here the useEffect function is given a funtion that is to be done whenever the web page renders for the first time.
  // empty array as a second argument means that you only want to perform the function once when the page loads for the first time;

  useEffect(() => {
    // creating a function to fetch data using async and await from a server.
    const fetchExchanges = async () => {
      try {
        // axios here is a js library for handling http request and responses
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data); // useState function  being called here with data to be updated int that empty array;
        setLoader(false);
      } catch (error) {
        setError(true);
        setLoader(false);
      }
    };

    // calling the fetch data function here
    fetchExchanges();
  }, []);

  if (error) {
    return <Error message={"Error while fetching data from the server."} />;
  }

  // return statement starts here==================================>

  return (
    <Container maxWidth={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{ "&:hover": { transform: "scale(1.1)" } }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchanges"}
      />
      <Heading noOfLines={1} size={"md"}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
