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
import { AiOutlineFileSearch } from "react-icons/ai";
import { HiPlus } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { api } from "../api/api";
import { DeleteProduct } from "../components/DeleteProduct";
import { EditProduct } from "../components/EditProduct";
import { useDispatch, useSelector } from "react-redux";

export default function ProductPages() {
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
		try {
			const result = await api.post("/product/v1", product);
			alert(result.data.message);
			fetchData(); // Memanggil fungsi fetchData untuk memperbarui data setelah berhasil melakukan input
		} catch (error) {
			console.error(error);
		}
	};

	const [products, setProducts] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [query, setQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(5);

	useEffect(() => {
		api
			.get("/product")
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		api
			.get(`/product/v4?search_query=${keyword}`)
			.then((response) => {
				setProducts(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [keyword]);

	const searchData = (e) => {
		e.preventDefault();
		setKeyword(query);
	};

	// Menghitung indeks produk awal dan akhir pada halaman saat ini
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	// Fungsi untuk mengubah halaman
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

	//    const [selectedFile, setSelectedFile] = useState(null);
	//  const fileInputRef = useRef(null);
	//  const handleFileChange = (event) => {
	//    setSelectedFile(event.target.files[0]);
	//  };

	//  async function handleUpload() {
	//    try {
	//      const formData = new FormData();
	//      formData.append("avatar", selectedFile);

	const fetchData = async () => {
		try {
			const response = await api.get("/product");
			setProducts(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	//   useEffect(() => {
	//     fetchData(); // Memanggil fungsi fetchData saat komponen pertama kali dirender

	//     const interval = setInterval(() => {
	//       fetchData(); // Memanggil fungsi fetchData setiap beberapa detik
	//     }, 5000); // Ubah nilai 5000 dengan interval (dalam milidetik) yang Anda inginkan

	//     return () => {
	//       clearInterval(interval); // Membersihkan interval saat komponen unmount
	//     };
	//   }, []);

	return (
		<>
			<Flex className="container">
				<Flex className="device" bg={"whitesmoke"}>
					<Flex className="sidebar">
						<SideBar />
					</Flex>
					<Flex w={"80%"} h={"100%"} flexDir={"column"}>
						<Flex className="topbar">{/* <TopBar /> */}</Flex>
						<Flex className="adminCategory" w="100%" flexDir={"column"}>
							<Stack px={"4"}>
								<Text fontSize={"24px"} fontWeight={"bold"} color={"black"}>
									Product
								</Text>
								<form onSubmit={searchData}>
									<HStack>
										<InputGroup>
											<InputLeftElement pointerEvents="none">
												<SlMagnifier />
											</InputLeftElement>
											<Input
												type="text"
												placeholder="Search Product"
												value={query}
												onChange={(e) => setQuery(e.target.value)}
												minW={"30vw"}
												borderColor={"blackAlpha.300"}
											/>
										</InputGroup>
										<Box
											w="100%"
											justifyContent={"start"}
											gap="10px"
											display={"flex"}
											p={4}
											m={8}
										>
											<Button
												type="submit"
												h={"26px"}
												w={"100px"}
												colorScheme="teal"
											>
												<SlMagnifier />
												Search
											</Button>
										</Box>
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
								</form>
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
										<Button onClick={onClose} colorScheme="yellow">
											Cancel
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
							<Flex w={"100%"} flexDir={"column"}>
								<TableContainer flexDir={"column"}>
									<Table variant="simple">
										<Thead bgColor={"whatsapp.400"}>
											<Tr>
												<Th>No</Th>
												<Th>Product Name</Th>
												<Th>Category</Th>
												<Th>Price</Th>
												<Th>Stok</Th>
												<Th
													display={"flex"}
													justifyContent={"center"}
													flexDir={"flex-end"}
												>
													Action
												</Th>
											</Tr>
										</Thead>
										<Tbody>
											{currentProducts.map((product, idx) => (
												<Tr key={product.id}>
													<Td>{indexOfFirstProduct + idx + 1}</Td>
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
																	size={"md"}
																	onClick={() => {
																		setEditProductId(product.id);
																		modalEdit.onOpen();
																	}}
																>
																	{<FiEdit cursor={"pointer"} />}
																	<EditProduct
																		id={editProductId}
																		isOpen={modalEdit.isOpen}
																		onClose={() => {
																			modalEdit.onClose();
																			fetchData();
																		}}
																	/>
																</Button>
																<Button
																	colorScheme="red"
																	size={"md"}
																	onClick={() => {
																		setDeleteProductId(product.id);
																		modalDelete.onOpen();
																	}}
																>
																	{<RiDeleteBin6Line cursor={"pointer"} />}
																	<DeleteProduct
																		id={deleteProductId}
																		isOpen={modalDelete.isOpen}
																		onClose={() => {
																			modalDelete.onClose();
																			fetchData();
																		}}
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
									<Flex mt={4}>
										{Array.from({
											length: Math.ceil(products.length / productsPerPage),
										}).map((_, index) => (
											<Button
												key={index + 1}
												onClick={() => paginate(index + 1)}
												colorScheme={
													currentPage === index + 1 ? "blue" : "gray"
												}
												mx={1}
											>
												{index + 1}
											</Button>
										))}
									</Flex>
								</TableContainer>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
