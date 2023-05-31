import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  Center,
  useColorMode,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  InputLeftElement,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export default function SearchBar() {
  return (
    <Flex>
      <InputGroup>
        <Input
          w={"170px"}
          fontSize={"12px"}
          border={"1px gray.600 solid"}
          type={"text"}
          color={"gray.400"}
          placeholder="Search"
          h={"32px"}
          id="searchbar"
          backgroundColor={"#424242"}
        ></Input>
        <InputLeftElement w={"30px"} h={"100%"}>
          <Icon
            colorScheme="whiteAlpha"
            color={"gray.400"}
            as={CiSearch}
            w={"24px"}
            h={"24px"}
            cursor={"pointer"}
          ></Icon>
        </InputLeftElement>
      </InputGroup>
    </Flex>
  );
}
