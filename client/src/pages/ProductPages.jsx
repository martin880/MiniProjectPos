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
  IconButton,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
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
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
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
    harga: 0,
    stock: 0,
    categoryId: 1,
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
    fetchProduct();
  }, [keyword]);

  async function fetchProduct(sortBy, sortDir) {
    await api
      .get(`/product/v4?search_query=${keyword}`, {
        params: {
          sortBy,
          sortDir,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const searchData = (e) => {
    e.preventDefault();
    setKeyword(query);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

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
            <Flex className="topbar">
              <TopBar />
            </Flex>
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
                        onClose();
                        fetchData();
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
              <Stack>
                <TableContainer p={4} justifyContent={"space-between"}>
                  <Table variant="simple">
                    <Thead bgColor={"whatsapp.400"}>
                      <Tr>
                        <Th>No</Th>

                        <Th>
                          Product Name{" "}
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="sm"
                            icon={
                              <RiArrowDropUpLine
                                onClick={() => {
                                  fetchProduct("productName", "ASC");
                                }}
                              />
                            }
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="sm"
                            icon={
                              <RiArrowDropDownLine
                                onClick={() => {
                                  fetchProduct("productName", "DESC");
                                }}
                              />
                            }
                          />
                        </Th>
                        <Th>Category</Th>
                        <Th>
                          Price{" "}
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="sm"
                            icon={
                              <RiArrowDropUpLine
                                onClick={() => {
                                  fetchProduct("harga", "ASC");
                                }}
                              />
                            }
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="sm"
                            icon={
                              <RiArrowDropDownLine
                                onClick={() => {
                                  fetchProduct("harga", "DESC");
                                }}
                              />
                            }
                          />
                        </Th>
                        <Th>Stok</Th>
                        <Th isNumeric>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {currentProducts.map((product, idx) => (
                        <Tr key={product.id}>
                          <Td>
                            {indexOfLastProduct - productsPerPage + idx + 1}
                          </Td>

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
                                    onClose={() => {
                                      modalEdit.onClose();
                                      fetchData();
                                    }}
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
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
