import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Image,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
// import iconphoto from "../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export function EditUser(props) {
  console.log(props);
  const toast = useToast();
  const [SelectedFile, setSelectedFile] = useState(null);
  const { selectedOption, setSelectedOption } = useState("");
  const inputFileRef = useRef(null);

  const [user, setUser] = useState(props.user); // Menggunakan props.user sebagai nilai awal

  useEffect(() => {
    setUser(props.user); // Update nilai user jika prop berubah
  }, [props.user]);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  //
  const editUser = async () => {
    // try {
    if (
      !(
        //   user.firstName &&
        //   user.lastName &&
        (user.email || user.phoneNumber || user.status || user.address)
        // && user.avatar
        // &&
        // SelectedFile
      )
    ) {
      toast({
        title: "At least there is one change",
        status: "warning",
        duration: 3000,
        position: "top",
        isClosable: false,
      });
    } else {
      const result = await api.patch("/auth/update/" + props.id, user);

      toast({
        title: "Editing Success",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: false,
      });
      props.onClose();
    }
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Input
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                type="file"
                display="none"
                // id="product_url"
              />
              {/* <Image
                src={iconphoto}
                w={"100px"}
                h={"100px"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              /> */}

              <Flex flexDir={"column"} w={"70%"}>
                Full Name
                <Box
                  fontSize={"20px"}
                >{`${props.user.firstName} ${props.user.lastName}`}</Box>
                KTP
                <Box fontSize={"20px"}>{`${props.user.KTP}`}</Box>
                Gender
                <Box fontSize={"20px"}>{`${props.user.sex}`}</Box>
                Email
                <Input id="email" value={user.email} onChange={inputHandler} />
                Phone Number
                <Input
                  id="phoneNumber"
                  value={user.phoneNumber}
                  onChange={inputHandler}
                />
                Status
                <Select
                  value={selectedOption}
                  id="status"
                  onClick={inputHandler}
                  placeholder={"STATUS"}
                >
                  <option value="ACTIVE">ACTIVATE</option>
                  <option value="INACTIVE">DEACTIVATE</option>
                </Select>
              </Flex>
            </Flex>
            <Box>
              Address
              <Input
                id="address"
                value={user.address}
                onChange={inputHandler}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={editUser} colorScheme="green">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
