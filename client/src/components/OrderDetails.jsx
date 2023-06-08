import { Box, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function OrderDetails() {
	const orderList = useSelector((state) => state.orderList);
	const list = [...orderList];

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
			flexDirection={"column"}
			gap={3}
			bg={orderList.length ? "#101314" : "#282C2C"}
			margin={"0 10px"}
			style={{
				borderRadius: "15px",
				transition: "background-color 500ms ease-in-out",
			}}
			alignItems={"center"}
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
			{(Summarize("Delivery") || []).map((val, index) => (
				<CardThree
					key={val[0]}
					idx={index + 1}
					productName={val[0]}
					unitPrice={val[1]}
					quantity={val[2]}
				/>
			))}
			{(Summarize("Reservation") || []).map((val, index) => (
				<CardFour
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

function CardThree(propsthree) {
	return (
		<Flex
			w={"100%"}
			h={"50px"}
			bg={"#33320b"}
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
					{propsthree.idx}
				</Flex>
				<Flex w={"65%"}>
					<Box padding={"0 8px"}>{propsthree.productName}</Box>
					<Box color={"whiteAlpha.700"}>x{propsthree.quantity}</Box>
				</Flex>
				<Flex w={"25%"} fontWeight={"500"} justifyContent={"end"}>
					{propsthree.unitPrice * propsthree.quantity}
				</Flex>
			</Flex>
		</Flex>
	);
}

function CardFour(propsfour) {
	return (
		<Flex
			w={"100%"}
			h={"50px"}
			bg={"#2b0b33"}
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
					{propsfour.idx}
				</Flex>
				<Flex w={"65%"}>
					<Box padding={"0 8px"}>{propsfour.productName}</Box>
					<Box color={"whiteAlpha.700"}>x{propsfour.quantity}</Box>
				</Flex>
				<Flex w={"25%"} fontWeight={"500"} justifyContent={"end"}>
					{propsfour.unitPrice * propsfour.quantity}
				</Flex>
			</Flex>
		</Flex>
	);
}
