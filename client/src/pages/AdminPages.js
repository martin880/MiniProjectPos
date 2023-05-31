import {
	Flex,
	FormControl,
	FormLabel,
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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineDownload } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export default function AdminPages() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
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
											placeholder="Search Admin"
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
										<Button h={"26px"} w={"100px"} border={"1px black solid"}>
											<AiOutlineDownload /> Download
										</Button>
										<Button
											onClick={onOpen}
											h={"26px"}
											w={"80px"}
											colorScheme={"facebook"}
										>
											<HiPlus />
											Cashier
										</Button>
									</Box>
								</HStack>
								<Modal
									initialFocusRef={initialRef}
									finalFocusRef={finalRef}
									isOpen={isOpen}
									onClose={onClose}
								>
									<ModalOverlay />
									<ModalContent>
										<ModalHeader>Create cashier account</ModalHeader>
										<ModalCloseButton />
										<ModalBody pb={6}>
											<FormControl>
												<FormLabel>First name</FormLabel>
												<Input ref={initialRef} placeholder="First name" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Last name</FormLabel>
												<Input placeholder="Last name" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Email</FormLabel>
												<Input placeholder="Email" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Phone Number</FormLabel>
												<Input placeholder="Phone Number" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Sex</FormLabel>
												<Input placeholder="Sex" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Address</FormLabel>
												<Input placeholder="Address" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>KTP ID</FormLabel>
												<Input placeholder="KTP ID" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Password</FormLabel>
												<Input placeholder="Password" />
											</FormControl>
											<FormControl mt={4}>
												<FormLabel>Ini upload gambar</FormLabel>
												<Input placeholder="Edit nanti ya bar" />
											</FormControl>
										</ModalBody>

										<ModalFooter>
											<Button colorScheme="blue" mr={3}>
												Save
											</Button>
											<Button onClick={onClose}>Cancel</Button>
										</ModalFooter>
									</ModalContent>
								</Modal>
							</Stack>

							<Stack>
								<TableContainer p={4}>
									<Table variant="simple">
										<Thead>
											<Tr>
												<Th>No</Th>
												<Th>Name</Th>
												<Th>Role</Th>
												<Th>Email</Th>
												<Th>Phone</Th>
												<Th>Last Seen</Th>
												<Th
													display={"flex"}
													align="center"
													justifyContent={"center"}
												>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											<Tr>
												<Td>1.</Td>
												<Td>Abdur</Td>
												<Td>Admin</Td>
												<Td>Abdur@example.com</Td>
												<Td>082308230823</Td>
												<Td>Wed Apr 5, 12:00 PM</Td>
												<Td>
													<Stack>
														<HStack>
															<Button colorScheme={"yellow"}>
																<FiEdit cursor={"pointer"} />
															</Button>
															<Button colorScheme="red">
																<RiDeleteBin6Line cursor={"pointer"} />
															</Button>
														</HStack>
													</Stack>
												</Td>
											</Tr>
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
