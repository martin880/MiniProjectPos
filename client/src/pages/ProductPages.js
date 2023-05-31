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
} from "@chakra-ui/react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineDownload } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

export default function ProductPages() {
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
									Product
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
										<Button h={"26px"} w={"80px"} colorScheme={"red"}>
											<HiPlus />
											Admin
										</Button>
									</Box>
								</HStack>
							</Stack>
							<Stack>
								<TableContainer p={4}>
									<Table variant="simple">
										<Thead>
											<Tr>
												<Th>No</Th>
												<Th>Product Name</Th>
												<Th>Price</Th>
												<Th>Stok</Th>
												<Th>Action</Th>
											</Tr>
										</Thead>
										<Tbody>
											<Tr>
												<Td>1.</Td>
												<Td>Coffe</Td>
												<Td>Rp.15000</Td>
												<Td>50</Td>
												<Td>
													<Stack>
														<HStack
															display={"flex"}
															align={"center"}
															justifyContent={"center"}
														>
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
