import React, { useState, useEffect } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	Stack,
	HStack,
	Button,
	TableContainer,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const TableProduct = ({ data }) => {
	const [products, setProducts] = useState([]);
	return (
		<>
			<TableContainer p={4}>
				<Table variant="simple">
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
						{data.map((produk) => (
							<Tr overflow={"hidden"} key={produk.id}>
								<Td>{produk.id}</Td>
								<Td>{produk.productName}</Td>
								<Td>{produk.category}</Td>
								<Td>{produk.harga}</Td>
								<Td>{produk.stock}</Td>
								<Td>
									<Stack>
										<HStack
											display={"flex"}
											align={"center"}
											justifyContent={"center"}
										>
											<Button colorScheme={"yellow"} w={"50%"}>
												<FiEdit cursor={"pointer"} />
											</Button>
											<Button colorScheme="red" w={"50%"}>
												<RiDeleteBin6Line cursor={"pointer"} />
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
		</>
	);
};

export default TableProduct;
