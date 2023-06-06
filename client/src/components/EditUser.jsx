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
} from "@chakra-ui/react";
// import iconphoto from "../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export function EditUser(props) {
  const [SelectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [user, setUser] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  });

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
        (user.email && user.phoneNumber && user.address)
        // && user.avatar
        // &&
        // SelectedFile
      )
    ) {
      alert("isi semua");
    } else {
      const result = await api.patch("/auth/update/" + props.id, user);

      alert("berhasil mengubah user");
      props.setChanged(!props.changed);
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
                email
                <Input id="email" onChange={inputHandler} />
                phoneNumber
                <Input id="phoneNumber" onChange={inputHandler} />
              </Flex>
            </Flex>
            <Box>
              Address
              <Input id="address" onChange={inputHandler} />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={editUser}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
