import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Stat,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";

import { BiCoffeeTogo, BiDrink, BiCake, BiParty } from "react-icons/bi";
import { GiSausage, GiNoodles, GiPieSlice, GiPlantSeed } from "react-icons/gi";

export default function Category() {
  const arr = [
    {
      icon: "BiCoffeeTogo",
      categoryName: "Coffee",
      color: "#CFDDDA",
      menuCount: 12,
    },
    {
      icon: "BiDrink",
      categoryName: "Non-Coffee",
      color: "#E4CDEF",
      menuCount: 10,
    },
    {
      icon: "GiSausage",
      categoryName: "Platter",
      color: "#C1DBE8",
      menuCount: 11,
    },
    {
      icon: "BiCake",
      categoryName: "Pastry",
      color: "#C9CAEE",
      menuCount: 5,
    },
    {
      icon: "GiNoodles",
      categoryName: "Main Course",
      color: "#F8C0D7",
      menuCount: 8,
    },
    {
      icon: "GiPieSlice",
      categoryName: "Dessert",
      color: "#E5D8DD",
      menuCount: 4,
    },
    {
      icon: "BiParty",
      categoryName: "Specials",
      color: "#EEC7CE",
      menuCount: 4,
    },
    {
      icon: "GiPlantSeed",
      categoryName: "Vegan",
      color: "#C1E7DC",
      menuCount: 4,
    },
    {
      icon: "GiPlantSeed",
      categoryName: "Vegan",
      color: "#C1E7DC",
      menuCount: 4,
    },
  ];

  return (
    <>
      <Grid
        templateColumns="repeat(4, 2fr)"
        gap={3}
        w={"100%"}
        h={"100%"}
        gridAutoFlow={"row"}
      >
        {arr.map((val) => (
          <Card
            key={val.categoryName}
            icon={val.icon}
            categoryName={val.categoryName}
            color={val.color}
            menuCount={val.menuCount}
          />
        ))}
      </Grid>
    </>
  );
}

function Card(props) {
  return (
    <GridItem
      w="100%"
      bg={props.color}
      maxH={"200px"}
      // minH={"200px"}
      className="category-list"
    >
      <Flex
        flexDirection={"column"}
        padding={"10px"}
        h={"100%"}
        justifyContent={"space-between"}
      >
        <Flex>
          <BiCoffeeTogo size={"35px"} />
        </Flex>
        <Flex>
          <Stat>
            <StatNumber>{props.categoryName}</StatNumber>
            <StatHelpText>{props.menuCount} items</StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </GridItem>
  );
}
