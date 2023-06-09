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
import { useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { LoginModal } from "./loginmodal";
import { LogoutModal } from "./logoutmodal";

export default function SideBar() {
  const orderType = useSelector((state) => state.orderType.value);
  const userSelector = useSelector((state) => state.login.auth);
  const modalLogin = useDisclosure();
  const modalLogout = useDisclosure();
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/");
  const nav = useNavigate();

  return (
    <>
      <Grid w="100%" templateRows="repeat(15, 1fr)" gap={3}>
        <GridItem gridRow={"1/3"} w="100%" color={"whitesmoke"}>
          <Flex className="logo" color={"white"} cursor={"pointer"}>
            CosyPOS
          </Flex>
        </GridItem>
        <GridItem w="100%" gridRow={"3/8"}>
          <Flex
            pb={"20px"}
            pl={"30px"}
            gap={"10px"}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            color="white"
            alignItems={"center"}
          ></Flex>
          <Flex className="menu" paddingLeft={"20px"} paddingRight={"20px"}>
            <Flex
              bgColor={
                orderType === "Dine In" ? "var(--section-color)" : "none"
              }
              className="menu-list"
              onClick={() => {
                dispatch(dineIn());
              }}
            >
              Dine In
            </Flex>
            <Flex
              bgColor={
                orderType === "Take Away" ? "var(--section-color)" : "none"
              }
              className="menu-list"
              onClick={() => {
                dispatch(takeAway());
              }}
            >
              Take Away
            </Flex>
            <Flex
              bgColor={
                orderType === "Delivery" ? "var(--section-color)" : "none"
              }
              className="menu-list"
              onClick={() => {
                dispatch(delivery());
              }}
            >
              Delivery
            </Flex>
            <Flex
              bgColor={
                orderType === "Reservation" ? "var(--section-color)" : "none"
              }
              className="menu-list"
              onClick={() => {
                dispatch(reservation());
              }}
            >
              Reservation
            </Flex>
            <Flex className="menu-list">Order Summary</Flex>
            <Flex
              className="menu-list"
              display={
                userSelector.role == "CASHIER" || !userSelector.role
                  ? "none"
                  : "inline-flex"
              }
              onClick={() => nav("/admin")}
            >
              Admin Page
            </Flex>
          </Flex>
          <Flex p={"30px"}></Flex>
        </GridItem>

        <GridItem w="100%" gridRow={"11/15"} paddingLeft={"20px"}>
          <Flex className="users" visibility={"hidden"}>
            <Flex>
              <Avatar name="Susi Pujiastuti" src="#" size={"sm"} />
            </Flex>

            <Flex paddingLeft={"15px"}>Susi P.</Flex>
          </Flex>
          <Flex className="users" visibility={"hidden"}>
            <Flex>
              <Avatar
                name="Mamud M"
                src="https://bit.ly/kent-c-dodds"
                size={"sm"}
              />
            </Flex>

            <Flex paddingLeft={"15px"}>Mahfud M.</Flex>
          </Flex>
          <Flex
            className="users"
            cursor={"pointer"}
            onClick={() => {
              !userSelector?.email ? modalLogin.onOpen() : modalLogout.onOpen();
            }}
          >
            <Flex>
              <Avatar
                name="Jowo. K"
                src="https://bit.ly/dan-abramov"
                size={"sm"}
              />
            </Flex>

            <Flex paddingLeft={"15px"}>
              {userSelector.firstName
                ? userSelector.firstName + " " + userSelector.lastName
                : "Guest"}
            </Flex>
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
      <Modal
        isOpen={modalLogout.isOpen}
        onClose={modalLogout.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <LogoutModal onClose={modalLogout.onClose} />
        </ModalContent>
      </Modal>
      <Modal isOpen={modalLogin.isOpen} onClose={modalLogin.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <LoginModal onClose={modalLogin.onClose} />
        </ModalContent>
      </Modal>
    </>
  );
}
