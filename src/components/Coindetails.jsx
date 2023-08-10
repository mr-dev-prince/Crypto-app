import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "../index";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Chart from "./Chart";

const Coindetails = () => {
  const [coin, setCoin] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const params = useParams();
  // useParams() hook is used to retrieve route parameter from the URL component. this hook allows us to extract dynamic segement from the url and use them as props or for rendering specific content based on current route.

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const changeDays = (key)=>{
    switch (key) {
      case "24h":
        setDays("24h");
        setLoader(true);
        break;
      case "7d":
        setDays("7d");
        setLoader(true)
        break;
      case "14d":
        setDays("14d");
        setLoader(true);
        break;
      case "30d":
        setDays("30d");
        setLoader(true);
        break;
      case "60d":
        setDays("60d");
        setLoader(true);
        break;
      case "200d":
        setDays("200d");
        setLoader(true);
        break;
      case "365d":
        setDays("365d");
        setLoader(true);
        break;
      case "max":
        setDays("max");
        setLoader(true);
        break;
    
      default:
        setDays("24h");
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoader(false);
      } catch (error) {
        setError(true);
        setLoader(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);


  if (error) {
    return <Error message={"Error while fetching coin from the server"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Box borderWidth={1} w={"full"}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={"4"} wrap={"wrap"} justifyContent={'center'}>
            {btns.map((i)=>(
              <Button key={i} onClick={()=>changeDays(i)}>{i}</Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"4"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                ></StatArrow>
                {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"}></Progress>
    <HStack justifyContent={"space-between"} colorscheme={"teal"} w={"full"}>
      <Badge children={low} colorscheme="red" />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorscheme="green" />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack w={"full"} my={"4"} justifyContent={"space-between"}>
    <Text letterSpacing={"widest"} fontFamily={"Bebas Neue"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

export default Coindetails;
