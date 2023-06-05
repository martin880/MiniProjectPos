import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { BiCreditCard, BiMoney, BiQr } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function OrderPayment() {
	const orderList = useSelector((state) => state.orderList);
	const list = [...orderList];
	const subTotal = list.reduce(
		(acc, curr) => acc + Number(curr.unitPrice),
		0
	);

	console.log("SUBTOTAL", subTotal);
	return (
		<Flex
			margin={"10px"}
			bg={"#282C2C"}
			w={"100%"}
			flexDirection={"column"}
			justifyContent={"space-between"}
			color={"var(--text-l2)"}
			style={{ borderRadius: "15px" }}
		>
			<Flex
				h={"35%"}
				flexDirection={"column"}
				justifyContent={"end"}
				alignItems={"center"}
			>
				<Flex
					h={"20%"}
					w={"90%"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Box>Subtotal</Box>
					<Box w={"25%"} textAlign={"right"}>
						{subTotal}
					</Box>
				</Flex>
				<Flex
					h={"20%"}
					w={"90%"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Box>Tax 10%</Box>
					<Box w={"25%"} textAlign={"right"}>
						{subTotal * 0.1}
					</Box>
				</Flex>
				<Flex h={"20%"} color={"var(--text-l3)"}>
					-------------------------------------
				</Flex>
				<Flex
					h={"30%"}
					w={"90%"}
					justifyContent={"space-between"}
					alignItems={"center"}
					fontSize={"25px"}
				>
					<Box color={"whiteAlpha.900"}>Total</Box>
					<Box w={"45%"} textAlign={"right"} color={"whiteAlpha.900"}>
						{subTotal + subTotal * 0.1}
					</Box>
				</Flex>
			</Flex>
			<Flex h={"45%"} flexDirection={"column"}>
				<Flex h={"60%"} flexDirection={"column"}>
					<Box padding={"0 10px"}>Payment method</Box>
					<Grid
						templateColumns={"repeat(3,1fr)"}
						gap={1}
						w={"100%"}
						padding={"10px 30px"}
						fontSize={"14px"}
					>
						<GridItem h={"70px"}>
							<Flex
								w={"full"}
								h={"full"}
								flexDirection={"column"}
							>
								<Flex
									h={"70%"}
									justifyContent={"center"}
									alignItems={"center"}
									border={"1px #b4b4b4 solid"}
									margin={"5px"}
									// borderRadius={"5px"}
									style={{ borderRadius: "5px" }}
								>
									<BiMoney size={"27px"} />
								</Flex>
								<Flex
									h={"30%"}
									justifyContent={"center"}
									alignItems={"center"}
								>
									Cash
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							<Flex
								w={"full"}
								h={"full"}
								flexDirection={"column"}
							>
								<Flex
									h={"70%"}
									justifyContent={"center"}
									alignItems={"center"}
									border={"1px #b4b4b4 solid"}
									margin={"5px"}
									// borderRadius={"5px"}
									style={{ borderRadius: "5px" }}
								>
									<BiCreditCard size={"27px"} />
								</Flex>
								<Flex
									h={"30%"}
									justifyContent={"center"}
									alignItems={"center"}
								>
									Card
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							{" "}
							<Flex
								w={"full"}
								h={"full"}
								flexDirection={"column"}
							>
								<Flex
									h={"70%"}
									justifyContent={"center"}
									alignItems={"center"}
									border={"1px #b4b4b4 solid"}
									margin={"5px"}
									// borderRadius={"5px"}
									style={{ borderRadius: "5px" }}
								>
									<BiQr size={"27px"} />
								</Flex>
								<Flex
									h={"30%"}
									justifyContent={"center"}
									alignItems={"center"}
								>
									eWallet
								</Flex>
							</Flex>
						</GridItem>
					</Grid>
				</Flex>
				<Flex h={"40%"} justifyContent={"center"} alignItems={"center"}>
					<Flex
						w={"75%"}
						h={"60%"}
						bg={"white"}
						// borderRadius={"30px"}
						style={{ borderRadius: "30px" }}
						justifyContent={"center"}
						alignItems={"center"}
						fontSize={"20px"}
						color={"black"}
					>
						Place Order
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
