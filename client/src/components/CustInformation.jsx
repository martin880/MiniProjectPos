import { Flex, Input } from "@chakra-ui/react";
import { BiWorld, BiCycling, BiRestaurant } from "react-icons/bi";
import React, { useState } from "react";
import Table from "../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { orderInfoModal } from "../redux/modalManager";
import { cutlery, delivery, custName } from "../redux/customerInfo";

export default function CustInformation() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.customerInfo);
	// const custNames = document.getElementById("custName").value;
	// console.log("CustName", custNames);
	const [name, setName] = useState("");

	const handleCustName = (event) => {
		const value = event.target.value;
		setName(value);
	};

	return (
		<Flex
			w={"90%"}
			h={"90%"}
			// bg={"red"}
			flexDirection={"column"}
			alignItems={"center"}
			justifyContent={"space-between"}
			padding={"5% 0"}
			fontFamily={"var(--font)"}
			fontSize={"18px"}
			zIndex={5}
		>
			<Flex
				w={"90%"}
				h={"85%"}
				bg={"#f5f8f7"}
				border={"2px #CFFB1F solid"}
				borderRadius={"25px"}
				flexDirection={"row"}
				padding={"20px"}
				gap={"15px"}
			>
				<Flex
					w={"70%"}
					// bg={"red.200"}
					flexDirection={"column"}
					gap={"15px"}
				>
					<Flex
						h={"30%"}
						bg={"#d0d4e7"}
						flexDirection={"column"}
						padding={"15px "}
						borderRadius={"20px"}
					>
						<Flex>Customer Name:</Flex>
						<Flex
							w={"full"}
							h={"full"}
							// bg={"purple.100"}
							fontWeight={"bold"}
							alignItems={"end"}
							// justifyContent={"end"}

							color={"#233300"}
							flexDirection={"row"}
						>
							<Input
								fontSize="70px"
								placeholder="Customer Name"
								maxW={"full"}
								w="full"
								h="full"
								paddingLeft={"30px"}
								variant={"unstyled"}
								id="custName"
								value={name}
								onChange={handleCustName}
							/>
						</Flex>
					</Flex>
					<Flex
						h={"70%"}
						padding={"15px"}
						flexDir={"column"}
						bg={"#d0d4e7"}
						borderRadius={"20px"}
					>
						<Flex>Select Table:</Flex>
						<Flex
							w={"full"}
							h={"full"}
							// bg={"purple.100"}
							justifyContent={"end"}
							// alignItems={"center"}
							padding={"25px"}
						>
							<Table />
						</Flex>
					</Flex>
				</Flex>
				<Flex
					w={"30%"}
					// bg={"green.200"}
					flexDirection={"column"}
					justifyContent={"space-between"}
					gap={"15px"}
				>
					<Flex
						h={"70%"}
						bg={"#d0d4e7"}
						padding={"15px"}
						flexDir={"column"}
						borderRadius={"20px"}
					>
						<Flex>Delivery Courier:</Flex>
						<Flex
							w={"full"}
							h={"full"}
							// bg={"purple.100"}
							flexDir={"column"}
							justifyContent={"space-evenly"}
						>
							<Flex
								className="kurir"
								outline={
									userInfo.delivery === "Gojek"
										? "1px solid #688902"
										: "1px solid rgba(120, 121, 130,0.2)"
								}
								bg={
									userInfo.delivery === "Gojek"
										? "#d0fb20"
										: ""
								}
								fontWeight={
									userInfo.delivery === "Gojek" ? "bold" : ""
								}
								onClick={() => {
									dispatch(delivery("Gojek"));
								}}
							>
								<BiCycling />
								<span style={{ paddingLeft: "10px" }}>
									Gojek
								</span>
							</Flex>
							<Flex
								className="kurir"
								outline={
									userInfo.delivery === "Grab"
										? "1px solid #688902"
										: "1px solid rgba(120, 121, 130,0.2)"
								}
								bg={
									userInfo.delivery === "Grab"
										? "#d0fb20"
										: ""
								}
								fontWeight={
									userInfo.delivery === "Grab" ? "bold" : ""
								}
								onClick={() => {
									dispatch(delivery("Grab"));
								}}
							>
								<BiCycling />
								<span style={{ paddingLeft: "10px" }}>
									Grab
								</span>
							</Flex>
							<Flex
								className="kurir"
								outline={
									userInfo.delivery === "Maxim"
										? "1px solid #688902"
										: "1px solid rgba(120, 121, 130,0.2)"
								}
								bg={
									userInfo.delivery === "Maxim"
										? "#d0fb20"
										: ""
								}
								fontWeight={
									userInfo.delivery === "Maxim" ? "bold" : ""
								}
								onClick={() => {
									dispatch(delivery("Maxim"));
								}}
							>
								<BiCycling />
								<span style={{ paddingLeft: "10px" }}>
									Maxim
								</span>
							</Flex>
							<Flex
								className="kurir"
								outline={
									userInfo.delivery === "Store"
										? "1px solid #688902"
										: "1px solid rgba(120, 121, 130,0.2)"
								}
								bg={
									userInfo.delivery === "Store"
										? "#d0fb20"
										: ""
								}
								fontWeight={
									userInfo.delivery === "Store" ? "bold" : ""
								}
								onClick={() => {
									dispatch(delivery("Store"));
								}}
							>
								<BiCycling />
								<span style={{ paddingLeft: "10px" }}>
									Store
								</span>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						h={"30%"}
						bg={"#d0d4e7"}
						padding={"15px"}
						flexDir={"column"}
						borderRadius={"20px"}
						cursor={"pointer"}
					>
						<Flex>Cutlery:</Flex>
						<Flex
							w={"full"}
							h={"full"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Flex
								w={"80%"}
								h={"75%"}
								bg={"#d0fb20"}
								borderRadius={"90px"}
								justifyContent={"center"}
								alignItems={"center"}
								fontSize={"30px"}
								fontWeight={"bold"}
								border={"1px solid #688902"}
								onClick={() => {
									dispatch(cutlery(!userInfo.cutlery));
								}}
							>
								{!userInfo.cutlery ? (
									<BiWorld />
								) : (
									<BiRestaurant />
								)}
								{!userInfo.cutlery ? (
									<span style={{ paddingLeft: "6px" }}>
										No
									</span>
								) : (
									<span style={{ paddingLeft: "6px" }}>
										Yes
									</span>
								)}
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
			<Flex
				h={"9%"}
				w={"100%"}
				flexDirection={"row"}
				gap={4}
				justifyContent={"center"}
			>
				<Flex
					w={"50%"}
					bg={"#151e1e"}
					borderRadius={"20px"}
					flexDirection={"row"}
					justifyContent={"space-evenly"}
					fontFamily={"var(--font)"}
					fontSize={"20px"}
					fontWeight={"500"}
					color={"#70918d"}
				>
					<Flex className="modal-menu" color={"#f5f8f7"}>
						<Flex>Dine In</Flex>
						<Flex
							w={"15px"}
							h={"10%"}
							bg={"whiteAlpha.800"}
							borderRadius={"5px"}
						></Flex>
					</Flex>
					<Flex className="modal-menu">
						<Flex>Take Away</Flex>
						<Flex
							w={"15px"}
							h={"10%"}
							bg={"whiteAlpha.400"}
							borderRadius={"5px"}
						></Flex>
					</Flex>
					<Flex className="modal-menu">
						<Flex>Delivery</Flex>
						<Flex
							w={"15px"}
							h={"10%"}
							bg={"whiteAlpha.400"}
							borderRadius={"5px"}
						></Flex>
					</Flex>
					<Flex className="modal-menu" color={"whiteAlpha.400"}>
						<Flex>Reservation</Flex>
						<Flex
							w={"15px"}
							h={"10%"}
							bg={"whiteAlpha.400"}
							borderRadius={"5px"}
						></Flex>
					</Flex>
				</Flex>
				<Flex
					w={"10%"}
					bg={"#500d00"}
					borderRadius={"20px"}
					flexDirection={"row"}
					justifyContent={"space-evenly"}
					fontFamily={"var(--font)"}
					fontSize={"20px"}
					fontWeight={"500"}
					color={"#70918d"}
					onClick={() => {
						dispatch(orderInfoModal(false));
					}}
					cursor={"pointer"}
				>
					<Flex
						className="modal-menu"
						color={"#ffcbc1"}
						onClick={() => {
							dispatch(custName(name));
						}}
					>
						<Flex>Exit</Flex>
						<Flex
							w={"15px"}
							h={"10%"}
							bg={"#ffcbc1"}
							borderRadius={"5px"}
						></Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
