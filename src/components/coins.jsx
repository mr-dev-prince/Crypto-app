import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import Error from "./Error";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import CoinsCard from "./CoinsCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoader(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoader(false);
      } catch (error) {
        setError(true);
        setLoader(false);
      }
    };
    fetchCoin();
  }, [currency, page]);

  if (error) {
    return <Error message={"Error while fetching coin from the server"} />;
  }

  return (
    <Container maxWidth={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"4"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justify={"space-evenly"}>
            {coins.map((i) => (
              <CoinsCard
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack overflowX={"auto"} w={"full"} p={"8"}>
            {btns.map((items, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                variant={"ghost"}
                textColor={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
