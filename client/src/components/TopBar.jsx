import {
  Flex,
  Center,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { LoginModal } from "./loginmodal";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutModal } from "./logoutModal";

export default function TopBar() {
  const userSelector = useSelector((state) => state.login.auth);
  const location = useLocation().pathname.split("/");

  const modal2 = useDisclosure();

  const dispatch = useDispatch();
  function logout() {
    localStorage.removeItem("auth");
    dispatch({
      type: "logout",
    });
    return;
  }
  return (
    <>
      <Flex w={"100%"}>
        <Flex w={"100%"} gap={"50px"}>
          <Center
            p={"0px 18px"}
            color={"white"}
            justifyContent={"space-between"}
          >
            <Flex
              display={location[1] == ("cashier" || "login") ? "block" : "none"}
            >
              <InputGroup>
                <Input
                  w={"200px"}
                  fontSize={"12px"}
                  border={"1px gray.600 solid"}
                  type={"text"}
                  color={"gray.400"}
                  placeholder="Search"
                  h={"28px"}
                  id="searchbar"
                  backgroundColor={
                    location[1] == ("cashier" || "login")
                      ? "#424242"
                      : "#dedddc"
                  }
                ></Input>
                <InputLeftElement w={"30px"} h={"100%"}>
                  <Icon
                    colorScheme="whiteAlpha"
                    color={"gray.400"}
                    as={CiSearch}
                    w={"28px"}
                    h={"28px"}
                    cursor={"pointer"}
                  ></Icon>
                </InputLeftElement>
              </InputGroup>
            </Flex>
          </Center>

          <Center
            p={"10px"}
            gap={"30px"}
            justifyContent={"space-between"}
            pr={"30px"}
          >
            <Flex flexDir={"column"} color={"white"}>
              <Flex
                fontSize={"17px"}
                display={
                  location[1] == ("cashier" || "login") ? "block" : "none"
                }
              >
                Table 5
              </Flex>
              <Flex
                fontSize={"10px"}
                color={"grey"}
                display={
                  location[1] == ("cashier" || "login") ? "block" : "none"
                }
              >
                Leslie k
              </Flex>
              <Flex
                display={
                  location[1] == ("admin" || "admin-product")
                    ? "inline-flex"
                    : "none"
                }
                color={"black"}
                flexDir={"row"}
                alignItems={"center"}
                gap={"20px"}
              >
                <Flex w={"280px"}>Sort by date :</Flex>
                <Input type="date" bgColor={"#dedddc"}></Input>
                <Flex fontSize={"20px"}>-</Flex>
                <Input type="date" bgColor={"#dedddc"}></Input>
                <Button>lol</Button>
              </Flex>
            </Flex>
          </Center>
          <Modal isOpen={modal2.isOpen} onClose={modal2.onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <LogoutModal onClose={modal2.onClose} />
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </>
  );
}
