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
	Select,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { AiOutlineDownload } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { api } from "../api/api";
import { DeleteProduct } from "../components/DeleteProduct";
import { EditProduct } from "../components/EditProduct";

const ProductPages = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { selectedOption, setSelectedOption } = useState("");
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);
	const [deleteProductId, setDeleteProductId] = useState(null);
	const [editProductId, setEditProductId] = useState(null);

	const modalDelete = useDisclosure();
	const modalEdit = useDisclosure();

	const [product, setProduct] = useState({
		productName: "",
		harga: "",
		stock: "",
		categoryId: "",
		photoProduct_url: "",
		photoProduct_blob: "",
	});
	const inputHandler = (e) => {
		const { id, value } = e.target;
		const tempProduct = { ...product };
		tempProduct[id] = value;
		setProduct(tempProduct);
		console.log(tempProduct);
	};

	const input = async () => {
		const result = await api.post("/product/v1", product);
		return alert(result.data.message);
	};

	const [products, setProducts] = useState([]);

	useEffect(() => {
		api
			.get("/product/")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		api
			.get("/category/")
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const getCategoryName = (x) => {
		const category = categories.find((y) => y.id === x);
		return category ? category.categoryName : "";
	};

	const search = (products) => {
		return products.filter(
			(product) =>
				product.productName.toLowerCase().includes(products) ||
				product.harga.toString().includes(products)
		);
	};

	//    const [selectedFile, setSelectedFile] = useState(null);
	//  const fileInputRef = useRef(null);
	//  const handleFileChange = (event) => {
	//    setSelectedFile(event.target.files[0]);
	//  };

	//  async function handleUpload() {
	//    try {
	//      const formData = new FormData();
	//      formData.append("avatar", selectedFile);

	//      await api.post("/avatar/upload-avatar", formData, {
	//        headers: {
	//          "Content-Type": "multipart/form-data",
	//        },
	//      });

	//      console.log("Photo product uploaded successfully");
	//    } catch (error) {
	//      console.error("Error uploading photo product:", error);
	//    }
	//  }

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
											colorScheme={"facebook"}
										>
											<HiPlus />
											Product
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
									<ModalHeader>Add Product</ModalHeader>
									<ModalCloseButton />
									<ModalBody pb={6}>
										<FormControl>
											<FormLabel>Product name</FormLabel>
											<Input
												ref={initialRef}
												placeholder="Product name"
												id="productName"
												onChange={inputHandler}
											/>
										</FormControl>
										<FormControl>
											<FormLabel>Product Image</FormLabel>
											<Input
												ref={initialRef}
												placeholder="Product image"
												id="photoProduct_url"
												onChange={inputHandler}
											/>
										</FormControl>
										<FormControl mt={4}>
											<FormLabel>Category</FormLabel>
											<Select
												value={selectedOption}
												id="categoryId"
												onClick={inputHandler}
												defaultValue={"1"}
											>
												{categories.map((category) => (
													<option key={category.id} value={`${category.id}`}>
														{category.categoryName}
													</option>
												))}
											</Select>
										</FormControl>
										<FormControl mt={4}>
											<FormLabel>Price</FormLabel>
											<Input
												placeholder="Price"
												id="harga"
												onChange={inputHandler}
											/>
										</FormControl>
										<FormControl mt={4}>
											<FormLabel>Stock</FormLabel>
											<Input
												placeholder="Stock"
												id="stock"
												onChange={inputHandler}
											/>
										</FormControl>
									</ModalBody>

									<ModalFooter>
										<Button
											colorScheme="blue"
											mr={3}
											onClick={() => {
												input();
												// handleUpload();
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
									<Table variant="simple" products={() => search(product)}>
										<Thead bgColor={"whatsapp.400"}>
											<Tr>
												<Th>No</Th>
												<Th>Product Name</Th>
												<Th>Category</Th>
												<Th>Price</Th>
												<Th>Stok</Th>
												<Th display={"flex"} justifyContent={"center"}>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{products?.map((product) => (
												<Tr key={product.id}>
													<Td>{product.id}</Td>
													<Td>{product.productName}</Td>
													<Td>{getCategoryName(product.categoryId)}</Td>
													<Td>{`Rp.${product.harga}`}</Td>
													<Td>{product.stock}</Td>

													<Td>
														<Stack>
															<HStack
																display={"flex"}
																align={"center"}
																justifyContent={"center"}
															>
																<Button
																	colorScheme={"yellow"}
																	w={"50%"}
																	onClick={() => {
																		setEditProductId(product.id);
																		modalEdit.onOpen();
																	}}
																>
																	{<FiEdit cursor={"pointer"} />}
																	<EditProduct
																		id={editProductId}
																		isOpen={modalEdit.isOpen}
																		onClose={modalEdit.onClose}
																	/>
																</Button>
																<Button
																	colorScheme="red"
																	w={"50%"}
																	onClick={() => {
																		setDeleteProductId(product.id);
																		modalDelete.onOpen();
																	}}
																>
																	{<RiDeleteBin6Line cursor={"pointer"} />}
																	<DeleteProduct
																		id={deleteProductId}
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
};

export default ProductPages;
