import {
	Flex,
	Grid,
	GridItem,
	Icon,
	Image,
	Input,
	Textarea,
	Center,
	Box,
	Button,
	Checkbox,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { api } from "../api/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function LoginModal(props) {
	const toast = useToast();
	const dispatch = useDispatch();
	const nav = useNavigate();
	const arr = [];
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});
	const [added, setAdded] = useState(["lol"]);
	function inputHandler(input) {
		const { value, id } = input.target;
		const tempobject = { ...login };
		tempobject[id] = value;
		setLogin(tempobject);
		console.log(tempobject);
	}
	async function Login() {
		try {
			let token;
			await api.post("http://localhost:2000/auth/v2", login).then((res) => {
				localStorage.setItem("auth", JSON.stringify(res.data.token));
				token = res.data.token;
				toast({
					title: "Login Success.",
					status: "success",
					duration: 3000,
					isClosable: false,
				});
			});
			api.get("http://localhost:2000/auth/v3?token=" + token).then((res) => {
				console.log(res.data);
				dispatch({
					type: "login",
					payload: res.data,
				});
				toast({
					title: "Login Success.",
					status: "success",
					duration: 3000,
					isClosable: false,
				});
				return;
			});

			props.onClose();
		} catch (err) {
			toast({
				title: "Wrong Email or Password.",
				status: "danger",
				duration: 3000,
				isClosable: false,
			});
		}
	}
	return (
		<>
			<Flex
				bgColor={"#000000"}
				color={"white"}
				maxW={"524px"}
				// maxH={'389px'}
				w={"524px"}
				h="100%"
				borderRadius={"5px"}
				flexDir={"column"}
				pb="20px"
			>
				<Flex
					justifyContent={"space-between"}
					w="100%"
					fontSize="24px"
					padding={"24px 24px 24px 24px"}
				>
					<Flex fontWeight={"bold"}>Login</Flex>
					<Flex>
						<Icon
							h={"36px"}
							w={"36px"}
							as={IoMdClose}
							color="#87878"
							cursor={"pointer"}
							onClick={() => props.onClose()}
						></Icon>
					</Flex>
				</Flex>
				<Flex padding={"24px 24px 24px 24px"} justifyContent={"space-between"}>
					<Flex
						flexDir={"column"}
						justifyContent={"space-between"}
						gap={"30px"}
					>
						<Input
							bgColor={"#3E3E3E"}
							border={"none"}
							w="400px"
							h="45px"
							placeholder="Email"
							onChange={inputHandler}
							id="email"
						></Input>
						<Input
							bgColor={"#3E3E3E"}
							border={"none"}
							w="400px"
							h={"45px"}
							resize={"none"}
							placeholder="Password"
							onChange={inputHandler}
							id="password"
							type="password"
						></Input>
						<Flex justifyContent={"space-between"}>
							<Checkbox>Remember me</Checkbox>
							<Flex cursor={"pointer"}>Forgot Password?</Flex>
						</Flex>
					</Flex>
				</Flex>

				<Flex w="100%" p={"24px"}>
					<Center
						borderRadius={"5px"}
						fontWeight={"600"}
						bgColor={"#7aebff"}
						h="48px"
						w="400px"
						cursor={"pointer"}
						onClick={Login}
					>
						LOGIN
					</Center>
				</Flex>
			</Flex>
		</>
	);
}
