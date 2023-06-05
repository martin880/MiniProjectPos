import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function OrderDetails() {
	const orderList = useSelector((state) => state.orderList);
	const list = [...orderList];
	// const listOK = Object.values(
	// 	list.reduce((acc, curr) => {
	// 		if (!acc[curr.menu]) {
	// 			acc[curr.menu] = [curr];
	// 		} else {
	// 			acc[curr.menu].push(curr);
	// 		}
	// 		return acc;
	// 	}, {})
	// );

	const groupByOrderType = (list || []).reduce((acc, curr) => {
		if (!acc[curr.orderType]) {
			acc[curr.orderType] = [curr];
		} else {
			acc[curr.orderType].push(curr);
		}
		return acc;
	}, {});

	// const groupByMenu = Object.values(
	// 	groupByOrderType["Dine In"].reduce((acc, curr) => {
	// 		if (!acc[curr.menu]) {
	// 			acc[curr.menu] = [curr];
	// 		} else {
	// 			acc[curr.menu].push(curr);
	// 		}
	// 		return acc;
	// 	}, {})
	// );

	// const dineInSummarized = groupByMenu.map((arr) => [
	// 	arr[0].menu,
	// 	arr[0].unitPrice,
	// 	arr.length,
	// ]);

	function Summarize(param) {
		const groupByMenu = Object.values(
			(groupByOrderType[param] || []).reduce((acc, curr) => {
				if (!acc[curr.menu]) {
					acc[curr.menu] = [curr];
				} else {
					acc[curr.menu].push(curr);
				}
				return acc;
			}, {})
		);

		const summary = (groupByMenu || []).map((arr) => [
			arr[0].menu,
			arr[0].unitPrice,
			arr.length,
		]);
		if (summary) {
			return summary;
		} else {
			return [];
		}
	}

	// console.log("GROUP BY TYPE", groupByOrderType["Dine In"]);
	// console.log("groupByOrderType", groupByOrderType);
	// console.log("groupByMenu", groupByMenu);
	// console.log("dineInSummarized", dineInSummarized);
	console.log("Summarize Dine In", Summarize("Dine In"));

	// console.log("ORDER LIST", orderList);
	// console.log("SUMM", summarized);

	return (
		<Flex
			w={"100%"}
			h={"100%"}
			padding={"0 10px"}
			flexDirection={"column"}
			gap={3}
		>
			{(Summarize("Dine In") || []).map((val, index) => (
				<Card
					key={val[0]}
					idx={index + 1}
					productName={val[0]}
					unitPrice={val[1]}
					quantity={val[2]}
				/>
			))}

			{(Summarize("Take Away") || []).map((val, index) => (
				<CardTwo
					key={val[0]}
					idx={index + 1}
					productName={val[0]}
					unitPrice={val[1]}
					quantity={val[2]}
				/>
			))}
		</Flex>
	);
}

function Card(props) {
	return (
		<Flex
			w={"100%"}
			h={"50px"}
			bg={"#282C2C"}
			style={{ borderRadius: "15px" }}
			flexDirection={"row"}
			justifyContent={"center"}
			alignItems={"center"}
			color={"white"}
		>
			<Flex w={"90%"} h={"80%"} alignItems={"center"}>
				<Flex
					w={"9%"}
					bg={"whiteAlpha.500"}
					style={{ borderRadius: "20px" }}
					justifyContent={"center"}
					color={"black"}
					margin={"5px"}
				>
					{props.idx}
				</Flex>
				<Flex w={"65%"}>
					<Box padding={"0 8px"}>{props.productName}</Box>
					<Box color={"whiteAlpha.700"}>x{props.quantity}</Box>
				</Flex>
				<Flex w={"25%"} fontWeight={"500"} justifyContent={"end"}>
					{props.unitPrice * props.quantity}
				</Flex>
			</Flex>
		</Flex>
	);
}

function CardTwo(propstwo) {
	return (
		<Flex
			w={"100%"}
			h={"50px"}
			bg={"#0b3333"}
			style={{ borderRadius: "15px" }}
			flexDirection={"row"}
			justifyContent={"center"}
			alignItems={"center"}
			color={"white"}
		>
			<Flex w={"90%"} h={"80%"} alignItems={"center"}>
				<Flex
					w={"9%"}
					bg={"whiteAlpha.500"}
					style={{ borderRadius: "20px" }}
					justifyContent={"center"}
					color={"black"}
					margin={"5px"}
				>
					{propstwo.idx}
				</Flex>
				<Flex w={"65%"}>
					<Box padding={"0 8px"}>{propstwo.productName}</Box>
					<Box color={"whiteAlpha.700"}>x{propstwo.quantity}</Box>
				</Flex>
				<Flex w={"25%"} fontWeight={"500"} justifyContent={"end"}>
					{propstwo.unitPrice * propstwo.quantity}
				</Flex>
			</Flex>
		</Flex>
	);
}
