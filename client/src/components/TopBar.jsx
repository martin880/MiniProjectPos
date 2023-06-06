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
} from "@chakra-ui/react";
import { LoginModal } from "./loginmodal";
import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";

export default function TopBar() {
  const location = useLocation().pathname.split("/");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w={"100%"}>
        <Flex justifyContent={"space-between"} w={"100%"}>
          <Center p={"0px 18px"}>
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
                  location[1] == ("cashier" || "login") ? "#424242" : "#dedddc"
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
          </Center>
          <Center
            p={"10px"}
            gap={"30px"}
            w={"274px"}
            justifyContent={"space-between"}
            pr={"30px"}
          >
            <Flex flexDir={"column"} color={"white"}>
              <Flex
                fontSize={"17px"}
                color={
                  location[1] == ("cashier" || "login") ? "white" : "black"
                }
              >
                Table 5
              </Flex>
              <Flex fontSize={"10px"} color={"grey"}>
                Leslie K
              </Flex>
            </Flex>
            <Flex>
              <Icon
                as={VscAccount}
                h={"28px"}
                w={"28px"}
                color={"#b0b0b0"}
                cursor={"pointer"}
                onClick={() => {
                  onOpen();
                }}
              ></Icon>
            </Flex>
          </Center>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <LoginModal onClose={onClose} />
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </>
  );
}
