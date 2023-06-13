import {
  Flex,
  Grid,
  GridItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, removeOrder } from "../redux/orderList";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Product(props) {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    await api.get("/product").then((res) => {
      setProducts(res.data);
      console.log(res.data);
    });
  }
  async function fetchProductsCategory() {
    await api.get("/product?categoryId=" + props.categoryId).then((res) => {
      setProducts(["lol"]);
      console.log(res.data);
    });
  }

  useEffect(() => {
    fetchProducts(); // Update nilai user jika prop berubah
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(4,2fr)" gap={3} w={"100%"}>
        {products.map((val) => (
          <Card
            key={val.productName}
            status={val.status}
            productName={val.productName}
            harga={val.harga}
          />
        ))}
      </Grid>
    </>
  );
}

function Card(props) {
  const orderType = useSelector((state) => state.orderType.value);
  const orderList = useSelector((state) => state.orderList);
  const currQuantity = orderList.filter(
    (item) =>
      item.menu === `${props.productName}` && item.orderType === `${orderType}`
  );
  const dispatch = useDispatch();
  const add = {
    menu: `${props.productName}`,
    unitPrice: `${props.harga}`,
    orderType: `${orderType}`,
    specialRequest: [],
    note: "",
  };

  // console.log("ORDER LIST STATE", orderList);

  function PrintVal() {
    // console.log("CART", );
    console.log("ORDER TYPE STATE", orderType);
    // console.log("ORDER LIST STATE", orderList);
  }

  return (
    <GridItem
      w={"100%"}
      bg={"#CEDCD9"}
      style={{ borderRadius: "15px" }}
      maxH={"200px"}
      // minH={"165px"}
      minH={"45%"}
      overflow={"hidden"}
    >
      <Flex flexDirection={"row"} h={"100%"} overflow={"hidden"}>
        <Flex w={"10px"}></Flex>
        <Flex
          w={"calc(100% - 10px)"}
          bg={"rgba(17, 19, 20, 0.85)"}
          paddingLeft={"10px"}
          paddingTop={"10px"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          overflow={"hidden"}
        >
          <Flex>
            <Stat color={"#ACACAC"}>
              <StatLabel fontSize={"12px"}>
                {/* {props.status}  */}
                {orderType}
              </StatLabel>
              <StatNumber
                color={"whitesmoke"}
                fontSize={"20px"}
                paddingTop={"10px"}
                onClick={PrintVal}
              >
                {props.productName}
              </StatNumber>
              <StatHelpText fontWeight={"500"}>{props.harga}</StatHelpText>
            </Stat>
          </Flex>
          <Flex
            w={"100%"}
            h={"45px"}
            paddingRight={"10px"}
            justifyContent={"end"}
          >
            <Flex w={"80%"} paddingBottom={"10px"} overflow={"hidden"}>
              <Grid
                templateColumns={"repeat(3,1fr)"}
                gap={1}
                w={"100%"}
                fontSize={"19px"}
                textAlign={"center"}
                color={"white"}
                overflow={"hidden"}
              >
                <GridItem
                  overflow={"hidden"}
                  className="qty-button"
                  color={currQuantity.length ? "white" : "grey"}
                  onClick={() => {
                    dispatch(
                      removeOrder({
                        productName: props.productName,
                        orderType: orderType,
                      })
                    );
                  }}
                >
                  -
                </GridItem>
                <GridItem w={"100%"}>{currQuantity.length}</GridItem>
                <GridItem
                  className="qty-button"
                  onClick={() => {
                    dispatch(addOrder(add));
                  }}
                >
                  +
                </GridItem>
              </Grid>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </GridItem>
  );
}
