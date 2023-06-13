import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Stat,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";

import {
  BiCoffee,
  BiWine,
  BiCake,
  BiParty,
  BiLeaf,
  BiSushi,
  BiBowlHot,
  BiCheese,
} from "react-icons/bi";

export default function Category() {
  const arr = [
    {
      icon: <BiCoffee size={"35px"} />,
      categoryName: "Coffee",
      color: "#CFDDDA",
      menuCount: 12,
      id: 1,
    },
    {
      icon: <BiWine size={"35px"} />,
      categoryName: "Non-Coffee",
      color: "#E4CDEF",
      menuCount: 10,
      id: 2,
    },
    {
      icon: <BiSushi size={"35px"} />,
      categoryName: "Platter",
      color: "#C1DBE8",
      menuCount: 11,
      id: 3,
    },
    {
      icon: <BiCake size={"35px"} />,
      categoryName: "Pastry",
      color: "#C9CAEE",
      menuCount: 5,
      id: 4,
    },
    {
      icon: <BiBowlHot size={"35px"} />,
      categoryName: "Main Course",
      color: "#F8C0D7",
      menuCount: 8,
      id: 5,
    },
    {
      icon: <BiCheese size={"35px"} />,
      categoryName: "Dessert",
      color: "#E5D8DD",
      menuCount: 4,
      id: 6,
    },
    {
      icon: <BiParty size={"35px"} />,
      categoryName: "Specials",
      color: "#EEC7CE",
      menuCount: 4,
      id: 7,
    },
    {
      icon: <BiLeaf size={"35px"} />,
      categoryName: "Vegan",
      color: "#C1E7DC",
      menuCount: 4,
      id: 8,
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
        overflow={"hidden"}
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
      // minH={"165px"}
      minH={"45%"}
      overflow={"hidden"}
      className="category-list"
    >
      <Flex
        flexDirection={"column"}
        padding={"10px"}
        h={"100%"}
        justifyContent={"space-between"}
        // overflow={"hidden"}
      >
        <Flex w={"32px"}>
          {/* <BiCoffeeTogo size={"35px"} /> */}
          {/* <Icon as={`${props.icon}`} /> */}
          {props.icon}
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
