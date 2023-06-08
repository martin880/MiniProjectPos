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
	const userSelector = useSelector((state) => state.login.auth);
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { selectedOption, setSelectedOption } = useState("");
	const initialRef = React.useRef(null);
	const finalRef = React.useRef(null);

	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		KTP: "",
		role: "CASHIER",
		email: "",
		phoneNumber: "",
		status: "ACTIVE",
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

	const [users, setUsers] = useState([]);
	const [keyword, setKeyword] = useState("");
	const [query, setQuery] = useState("");
	const [changed, setChanged] = useState(true);

	const fetchData = async () => {
		try {
			const response = await api.get("/auth/getAll");
			setUsers(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		api
			.get("/auth/role?role=CASHIER")
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	useEffect(() => {
		api
			.get(`/auth/v5?search_query=${keyword}`)
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [keyword]);

	const searchData = (e) => {
		e.preventDefault();
		setKeyword(query);
	};

	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (event, id) => {
		setSelectedFile(event.target.files[0]);
		if (id) {
			uploadAvatar(event.target.files[0], id);
		}
	};

	async function uploadAvatar(file, id) {
		try {
			console.log(file);
			console.log(id);

			const formData = new FormData();
			formData.append("avatar", file);
			let user;
			await api.post("/auth/image/v2/" + id, formData).then((res) => {
				alert(res.data);
			});
			console.log(user);
			if (user) {
				await dispatch({
					type: "login",
					payload: user,
				});
				alert(`berhasil upload`);
			}
			setSelectedFile(null);

			fetchData();
		} catch (err) {
			setSelectedFile(null);
		}
	}

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
								<form onSubmit={searchData}>
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
												value={query}
												onChange={(e) => setQuery(e.target.value)}
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
												onClick={searchData}
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
												colorScheme={"red"}
											>
												<HiPlus />
												Cashier
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
												onChange={inputHandler}
												placeholder="Gender"
												// defaultValue={"Gender"}
											>
												<option value="Male">Male</option>
												<option value="Female">Female</option>
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
												fetchData();
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
							<Stack>
								<TableContainer p={4} justifyContent={"space-between"}>
									<Table variant="simple">
										<Thead>
											<Tr>
												<Th>No</Th>
												<Th>Photo</Th>
												<Th>Full Name</Th>
												<Th>Status</Th>
												<Th>Email</Th>
												<Th>Phone</Th>
												<Th>Action</Th>
											</Tr>
										</Thead>
										<Tbody>
											{users.map((user, idx) => (
												<RowUser
													key={user.id}
													user={user}
													idx={idx}
													handleFileChange={handleFileChange}
													fetchData={fetchData}
												/>
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

function RowUser({ user, idx, handleFileChange, fetchData }) {
	// const [selectedFile, setSelectedFile] = useState(null);
	const [deleteUserId, setDeleteUserId] = useState(null);
	const [editUserId, setEditUserId] = useState(null);

	const modalDelete = useDisclosure();
	const modalEdit = useDisclosure();
	const fileInputRef = useRef(null);

	console.log(user);
	return (
		<Tr key={user.id}>
			<Td>{idx + 1}</Td>
			<Td>
				<Flex justify="center" align="center">
					<Avatar
						cursor={"pointer"}
						size="md"
						src={user.avatar_url}
						onClick={() => fileInputRef.current.click()}
					/>
				</Flex>
				<Input
					type="file"
					ref={fileInputRef}
					onChange={(e) => {
						// console.log(e.target.files[0]);
						// console.log(selectedFile);
						handleFileChange(e, user.id);
					}}
					display={"none"}
				></Input>
			</Td>
			<Td>{`${user.firstName} ${user.lastName}`}</Td>
			<Td>{user.status}</Td>
			<Td>{user.email}</Td>
			<Td>{user.phoneNumber}</Td>

			<Td>
				<Stack>
					<HStack>
						<Button
							w={"50%"}
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
								onClose={() => {
									modalEdit.onClose();
									fetchData();
								}}
							/>
						</Button>
						<Button
							w={"50%"}
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
	);
}
