import {
	Flex,
	Grid,
	GridItem,
	Stat,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { table } from "../redux/customerInfo";

export default function Table() {
	const arr = [
		{
			display: "Table 01",
			code: "T01",
		},
		{
			display: "Table 02",
			code: "T02",
		},
		{
			display: "Table 03",
			code: "T03",
		},
		{
			display: "Table 04",
			code: "T04",
		},
		{
			display: "Table 05",
			code: "T05",
		},
		{
			display: "Table 06",
			code: "T06",
		},
		{
			display: "Table 07",
			code: "T07",
		},
		{
			display: "Table 08",
			code: "T08",
		},
	];

	return (
		<>
			<Grid templateColumns="repeat(4,2fr)" gap={3} w={"100%"}>
				{arr.map((val, index) => (
					<Card key={index} display={val.display} code={val.code} />
				))}
			</Grid>
		</>
	);
}

function Card(props) {
	const orderType = useSelector((state) => state.orderType.value);

	function PrintVal() {
		// console.log("CART", );
		console.log("ORDER TYPE STATE", orderType);
		// console.log("ORDER LIST STATE", orderList);
	}
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.customerInfo);

	return (
		<GridItem
			w={"100%"}
			bg={userInfo.table === props.display ? "#CFFB1F" : ""}
			outline={
				userInfo.table === props.display
					? "1px solid #688902"
					: "1px solid rgba(120, 121, 130,0.2)"
			}
			style={{ borderRadius: "15px" }}
			maxH={"100px"}
			// minH={"165px"}
			overflow={"scroll"}
		>
			<Flex flexDirection={"row"} h={"100%"}>
				<Flex w={"10px"}></Flex>
				<Flex
					w={"calc(100% - 10px)"}
					// bg={"blue"}
					cursor={"pointer"}
					paddingLeft={"10px"}
					paddingTop={"10px"}
					flexDirection={"column"}
					justifyContent={"space-between"}
					onClick={() => {
						dispatch(table(props.display));
					}}
				>
					<Flex>
						<Stat color={"#223300"}>
							<StatLabel fontSize={"12px"}>
								{props.code}
							</StatLabel>
							<StatNumber
								// color={"whitesmoke"}
								fontSize={"20px"}
								paddingTop={"10px"}
								onClick={PrintVal}
							>
								{props.display}
							</StatNumber>
						</Stat>
					</Flex>
				</Flex>
			</Flex>
		</GridItem>
	);
}
