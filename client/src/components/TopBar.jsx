import {
	Flex,
	Center,
	Modal,
	ModalContent,
	ModalOverlay,
	useDisclosure,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Stat,
	StatNumber,
	StatHelpText,
} from "@chakra-ui/react";
import React from "react";
import { CiSearch, CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { orderInfoModal } from "../redux/modalManager";

export default function TopBar() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.customerInfo);
	const orderType = useSelector((state) => state.orderType.value);

	return (
		<>
			<Flex className="top-container" bg={"#101314"}>
				<Flex className="top-spacing" paddingLeft={"10px"}>
					<InputGroup
						bg={"var(--greyopa)"}
						w={"70%"}
						borderColor={"#111314"}
						// borderRadius={"6px"}
						style={{ borderRadius: "6px" }}
					>
						{" "}
						<InputLeftElement>
							<CiSearch color="var(--text-l3)" size={"30px"} />
						</InputLeftElement>
						<Input type="text" placeholder="Search" color="#595959" />
					</InputGroup>
				</Flex>
				<Flex
					className="top-spacing"
					justifyContent={"end"}
					paddingRight={"20px"}
				>
					<Flex
						className="table"
						cursor={"pointer"}
						onClick={() => {
							dispatch(orderInfoModal(true));
						}}
					>
						<Stat>
							<StatNumber display={orderType === "Dine In" ? "block" : "none"}>
								{userInfo.table ? userInfo.table : "Select Table"}
							</StatNumber>
							<StatNumber
								display={orderType === "Take Away" ? "block" : "none"}
							>
								{userInfo.cutlery ? "With Cutlery" : "No Cutlery"}
							</StatNumber>
							<StatNumber display={orderType === "Delivery" ? "block" : "none"}>
								{userInfo.delivery ? userInfo.delivery : "Select Delivery"}
							</StatNumber>
							<StatNumber
								display={orderType === "Reservation" ? "block" : "none"}
							>
								{orderType === "Reservation" ? "Manual Input" : "Manual Input"}
							</StatNumber>
							<StatHelpText>Customer Name</StatHelpText>
						</Stat>
					</Flex>
					<CiEdit
						color="var(--text-l2)"
						size={"30px"}
						style={{ borderRadius: "10px" }}
						border={"2px red solid"}
						onClick={() => {
							dispatch(orderInfoModal(true));
						}}
						cursor={"pointer"}
					/>
				</Flex>
			</Flex>
		</>
	);
}
