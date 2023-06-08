import {
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Stat,
	StatHelpText,
	StatNumber,
} from "@chakra-ui/react";
import React from "react";
import { CiSearch, CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { orderInfoModal } from "../redux/modalManager";

export default function TopBarAdmin() {
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.customerInfo);
	const orderType = useSelector((state) => state.orderType.value);

	return (
		<>
			<Flex className="top-container">
				<Flex
					className="top-spacing"
					paddingLeft={"10px"}
					visibility={"hidden"}
				>
					<Stat color={"#282828"}>
						<StatNumber>Monday</StatNumber>
						<StatHelpText>07 June 2023</StatHelpText>
					</Stat>
				</Flex>
				<Flex
					className="top-spacing"
					justifyContent={"end"}
					paddingRight={"20px"}
				>
					<Flex className="table">
						<Stat color={"#282828"}>
							<StatNumber>Monday</StatNumber>
							<StatHelpText>07 June 2023</StatHelpText>
						</Stat>
					</Flex>
					<CiEdit visibility={"hidden"} />
				</Flex>
			</Flex>
		</>
	);
}
