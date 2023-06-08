import {
	Flex,
	Grid,
	GridItem,
	Stat,
	StatHelpText,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, removeOrder } from "../redux/orderList";
export default function Product() {
	const arr = [
		{
			status: "Available",
			productName: "Espresso",
			price: 22000,
		},
		{
			status: "Available",
			productName: "Cappuccino",
			price: 28000,
		},
		{
			status: "Available",
			productName: "Coffee Latte",
			price: 28000,
		},
		{
			status: "Available",
			productName: "Americano",
			price: 24000,
		},
		{
			status: "Available",
			productName: "Mocha",
			price: 30000,
		},
		{
			status: "Available",
			productName: "Macchiato",
			price: 27000,
		},
		{
			status: "Available",
			productName: "Flat White",
			price: 25000,
		},
		{
			status: "Available",
			productName: "Cold Brew",
			price: 35000,
		},
	];

	return (
		<>
			<Grid templateColumns="repeat(4,2fr)" gap={3} w={"100%"}>
				{arr.map((val) => (
					<Card
						key={val.productName}
						status={val.status}
						productName={val.productName}
						price={val.price}
					/>
				))}
			</Grid>
		</>
	);
}

function Card(props) {
	const orderType = useSelector((state) => state.orderType.value);
	const orderList = useSelector((state) => state.orderList);
	const currQuantity = orderList.filter(
		(item) =>
			item.menu === `${props.productName}` &&
			item.orderType === `${orderType}`
	);
	const dispatch = useDispatch();
	const add = {
		menu: `${props.productName}`,
		unitPrice: `${props.price}`,
		orderType: `${orderType}`,
		specialRequest: [],
		note: "",
	};

	// console.log("ORDER LIST STATE", orderList);

	function PrintVal() {
		// console.log("CART", );
		console.log("ORDER TYPE STATE", orderType);
		// console.log("ORDER LIST STATE", orderList);
	}

	return (
		<GridItem
			w={"100%"}
			bg={"#CEDCD9"}
			style={{ borderRadius: "15px" }}
			maxH={"200px"}
			// minH={"165px"}
			minH={"45%"}
			overflow={"scroll"}
		>
			<Flex flexDirection={"row"} h={"100%"}>
				<Flex w={"10px"}></Flex>
				<Flex
					w={"calc(100% - 10px)"}
					bg={"rgba(17, 19, 20, 0.85)"}
					paddingLeft={"10px"}
					paddingTop={"10px"}
					flexDirection={"column"}
					justifyContent={"space-between"}
				>
					<Flex>
						<Stat color={"#ACACAC"}>
							<StatLabel fontSize={"12px"}>
								{/* {props.status}  */}
								{orderType}
							</StatLabel>
							<StatNumber
								color={"whitesmoke"}
								fontSize={"20px"}
								paddingTop={"10px"}
								onClick={PrintVal}
							>
								{props.productName}
							</StatNumber>
							<StatHelpText fontWeight={"500"}>
								{props.price}
							</StatHelpText>
						</Stat>
					</Flex>
					<Flex
						w={"100%"}
						h={"45px"}
						paddingRight={"10px"}
						justifyContent={"end"}
					>
						<Flex w={"80%"} paddingBottom={"10px"}>
							<Grid
								templateColumns={"repeat(3,1fr)"}
								gap={1}
								w={"100%"}
								fontSize={"19px"}
								textAlign={"center"}
								color={"white"}
							>
								<GridItem
									className="qty-button"
									color={
										currQuantity.length ? "white" : "grey"
									}
									onClick={() => {
										dispatch(
											removeOrder({
												productName: props.productName,
												orderType: orderType,
											})
										);
									}}
								>
									-
								</GridItem>
								<GridItem w={"100%"}>
									{currQuantity.length}
								</GridItem>
								<GridItem
									className="qty-button"
									onClick={() => {
										dispatch(addOrder(add));
									}}
								>
									+
								</GridItem>
							</Grid>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</GridItem>
	);
}
