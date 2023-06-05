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
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import { HiPlus } from "react-icons/hi";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import TableProduct from "../components/TableProduct";
import { Produks } from "../produks";

const ProductPages = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const [query, setQuery] = useState("");
	const search = (data) => {
		return data.filter(
			(produk) =>
				produk.productName.toLowerCase().includes(query) ||
				produk.harga.toString().includes(query)
		);
	};

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
											placeholder="Search Product"
											minW={"30vw"}
											borderColor={"blackAlpha.300"}
											onChange={(e) => setQuery(e.target.value)}
										/>
									</InputGroup>
									<Button h={"26px"} w={"140px"} border={"1px black solid"}>
										Enter
									</Button>
									<Box
										w="100%"
										justifyContent={"flex-end"}
										gap="10px"
										display={"flex"}
										p={4}
										m={8}
									>
										<Button
											onClick={onOpen}
											h={"26px"}
											w={"80px"}
											colorScheme={"facebook"}
										>
											<HiPlus />
											Product
										</Button>
									</Box>
								</HStack>
								<TableProduct data={search(Produks)} />
							</Stack>
							<Modal
								initialFocusRef={initialRef}
								finalFocusRef={finalRef}
								isOpen={isOpen}
								onClose={onClose}
							>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader>Add Product</ModalHeader>
									<ModalCloseButton />
									<ModalBody pb={6}>
										<FormControl>
											<FormLabel>Product name</FormLabel>
											<Input ref={initialRef} placeholder="Product name" />
										</FormControl>
										<FormControl>
											<FormLabel>Product Image</FormLabel>
											<Input ref={initialRef} placeholder="Product image" />
										</FormControl>
										<FormControl mt={4}>
											<FormLabel>Category</FormLabel>
											<Input placeholder="Category" />
										</FormControl>
										<FormControl mt={4}>
											<FormLabel>Price</FormLabel>
											<Input placeholder="Price" />
										</FormControl>
										<FormControl mt={4}>
											<FormLabel>Stock</FormLabel>
											<Input placeholder="Stock" />
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
							<Stack></Stack>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default ProductPages;
