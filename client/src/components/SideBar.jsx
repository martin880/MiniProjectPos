import {
  Avatar,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { dineIn, takeAway, delivery, reservation } from "../redux/orderType";
import { useLocation } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { LoginModal } from "./loginmodal";

export default function SideBar() {
  const userSelector = useSelector((state) => state.login.auth);
  const modal1 = useDisclosure();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/");

  function logout() {
    alert("asd");
    window.location.reload();
    localStorage.removeItem("auth");
    dispatch({
      type: "logout",
    });
    return;
  }
  return (
    <>
      <Grid w="100%" templateRows="repeat(15, 1fr)" gap={3}>
        <GridItem gridRow={"1/3"} w="100%" color={"whitesmoke"}>
          <Flex
            className="logo"
            color={location[1] == ("cashier" || "login") ? "white" : "black"}
            cursor={"pointer"}
          >
            CosyPOS
          </Flex>
        </GridItem>
        <GridItem w="100%" gridRow={"3/8"}>
          <Flex
            pb={"20px"}
            pl={"30px"}
            color={"white"}
            gap={"10px"}
            color={location[1] == ("cashier" || "login") ? "white" : "black"}
            alignItems={"center"}
          >
            <Avatar src={userSelector?.avatar_url} cursor={"pointer"}></Avatar>
            {userSelector.firstName
              ? userSelector.firstName + " " + userSelector.lastName
              : "Guest"}
          </Flex>
          <Flex className="menu" paddingLeft={"20px"} paddingRight={"20px"}>
            <Flex
              className="menu-list"
              onClick={() => {
                dispatch(dineIn());
              }}
            >
              Dine In
            </Flex>
            <Flex
              className="menu-list"
              onClick={() => {
                dispatch(takeAway());
              }}
            >
              Take Away
            </Flex>
            <Flex
              className="menu-list"
              onClick={() => {
                dispatch(delivery());
              }}
            >
              Delivery
            </Flex>
            <Flex
              className="menu-list"
              onClick={() => {
                dispatch(reservation());
              }}
            >
              Reservation
            </Flex>
            <Flex className="menu-list">Order Summary</Flex>
          </Flex>
          <Flex p={"30px"}>
            <Button
              colorScheme="linkedin"
              w={"100px"}
              onClick={() => {
                !userSelector?.email ? modal1.onOpen() : logout();
              }}
            >
              {userSelector?.email ? "Logout" : "Login"}
            </Button>
          </Flex>
        </GridItem>

        <GridItem w="100%" gridRow={"11/15"} paddingLeft={"20px"}>
          <Flex className="users">
            <Flex>
              <Avatar name="Susi Pujiastuti" src="#" size={"sm"} />
            </Flex>

            <Flex paddingLeft={"15px"}>Susi P.</Flex>
          </Flex>
          <Flex className="users">
            <Flex>
              <Avatar
                name="Mamud M"
                src="https://bit.ly/kent-c-dodds"
                size={"sm"}
              />
            </Flex>

            <Flex paddingLeft={"15px"}>Mahfud M.</Flex>
          </Flex>
          <Flex className="users">
            <Flex>
              <Avatar
                name="Jowo K."
                src="https://bit.ly/dan-abramov"
                size={"sm"}
              />
            </Flex>

            <Flex paddingLeft={"15px"}>Jowo K.</Flex>
          </Flex>
        </GridItem>
        <GridItem w="100%" gridRow={"15"} paddingLeft={"40px"}>
          <Flex
            alignItems={"center"}
            h={"100%"}
            color={"rgba(179, 179, 179, 0.5)"}
            fontSize={"14px"}
          >
            Order: COF-0239-000-01
          </Flex>
        </GridItem>
      </Grid>
      <Modal isOpen={modal1.isOpen} onClose={modal1.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <LoginModal onClose={modal1.onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
