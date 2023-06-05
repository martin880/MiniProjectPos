import {
  Flex,
  Text,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Avatar,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineDownload } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { EditUser } from "../components/EditUser";
import { DeleteUser } from "../components/DeleteUser";

export default function AdminPages() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedOption, setSelectedOption } = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  const modalDelete = useDisclosure();
  const modalEdit = useDisclosure();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    KTP: "",
    role: "",
    email: "",
    phoneNumber: "",
    sex: "",
    address: "",
    avatar: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const register = async () => {
    const result = await api.post("/auth/", user);
    return alert(result.data.message);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleUpload() {
    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await api.post("/avatar/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Avatar uploaded successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/auth/getAll")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //   async function uploadAvatar() {
  //     const formData = new FormData();
  //     formData.append("avatar", selectedFile);
  //     let user;
  //     await api
  //       .post("/auth/image/v1/" + userSelector.id, formData)
  //       .then((res) => {
  //         alert(res.data);
  //       });
  //     console.log(user);
  //     if (user) {
  //       await dispatch({
  //         type: "login",
  //         payload: user,
  //       });
  //       alert(`berhasil upload`);
  //     }
  //   }

  //   const handleFile = (event) => {
  //     setSelectedFile(event.target.files[0]);
  //     console.log(event.target.files[0]);
  //   };

  return (
    <>
      <Flex className="container">
        <Flex className="device" bg={"whitesmoke"}>
          <Flex className="sidebar">
            <SideBar />
          </Flex>
          <Flex w={"80%"} h={"100%"} flexDir={"column"}>
            <Flex className="topbar">
              <TopBar />
            </Flex>
            <Flex className="adminCategory" w="100%" flexDir={"column"}>
              <Stack px={"4"}>
                <Text fontSize={"24px"} fontWeight={"bold"} color={"black"}>
                  Cashier
                </Text>
                <HStack>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <SlMagnifier />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Search Cashier"
                      minW={"30vw"}
                      borderColor={"blackAlpha.300"}
                    />
                  </InputGroup>
                  <Box
                    w="100%"
                    justifyContent={"flex-end"}
                    gap="10px"
                    display={"flex"}
                    p={4}
                    m={8}
                  >
                    {/* <Button h={"26px"} w={"100px"} border={"1px black solid"}>
                      <AiOutlineDownload /> Download
                    </Button> */}
                    <Button
                      onClick={onOpen}
                      h={"26px"}
                      w={"80px"}
                      colorScheme={"red"}
                    >
                      <HiPlus />
                      Cashier
                    </Button>
                  </Box>
                </HStack>
              </Stack>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Cashier</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Fist Name</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="First Name"
                        id="firstName"
                        onChange={inputHandler}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Last Name"
                        id="lastName"
                        onChange={inputHandler}
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>NIK</FormLabel>
                      <Input
                        placeholder="NIK"
                        id="KTP"
                        onChange={inputHandler}
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        value={selectedOption}
                        id="sex"
                        onClick={inputHandler}
                        defaultValue={"Male"}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Role</FormLabel>
                      <Select
                        value={selectedOption}
                        id="role"
                        onClick={inputHandler}
                        defaultValue={"Cashier"}
                      >
                        <option value="Cashier">Cashier</option>
                      </Select>
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>E-Mail</FormLabel>
                      <Input
                        placeholder="E-Mail"
                        id="email"
                        onChange={inputHandler}
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        placeholder="Phone Number"
                        id="phoneNumber"
                        onChange={inputHandler}
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="Address"
                        id="address"
                        onChange={inputHandler}
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel htmlFor="avatar">Avatar Photo</FormLabel>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        placeholder="Password"
                        id="password"
                        onChange={inputHandler}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => {
                        register();
                        handleUpload();
                        onClose();
                      }}
                    >
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Stack>
                <TableContainer p={4}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>id</Th>
                        <Th>Photo</Th>
                        <Th>Full Name</Th>
                        <Th>NIK</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {users.map((user) => (
                        <Tr key={user.id}>
                          <Td>{user.id}</Td>
                          <Td>
                            <Flex justify="center" align="center">
                              <Avatar size="md" />
                            </Flex>
                          </Td>
                          <Td>{`${user.firstName} ${user.lastName}`}</Td>
                          <Td>{user.KTP}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.phoneNumber}</Td>

                          <Td>
                            <Stack>
                              <HStack>
                                <Button
                                  colorScheme={"yellow"}
                                  onClick={() => {
                                    setEditUserId(user.id);
                                    modalEdit.onOpen();
                                  }}
                                >
                                  {<FiEdit cursor={"pointer"} />}
                                  <EditUser
                                    id={editUserId}
                                    isOpen={modalEdit.isOpen}
                                    onClose={modalEdit.onClose}
                                  />
                                </Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    setDeleteUserId(user.id);
                                    modalDelete.onOpen();
                                  }}
                                >
                                  {<RiDeleteBin6Line cursor={"pointer"} />}
                                  <DeleteUser
                                    id={deleteUserId}
                                    isOpen={modalDelete.isOpen}
                                    onClose={modalDelete.onClose}
                                  />
                                </Button>
                              </HStack>
                            </Stack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr></Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
