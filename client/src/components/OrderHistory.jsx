import { Flex, Stat, StatHelpText, StatNumber } from "@chakra-ui/react";

export default function OrderHistory() {
	const arr = [
		{
			table: 4,
			items: 6,
			time: "26 minutes ago",
			paymentStatus: "done",
		},
		{
			table: 3,
			items: 2,
			time: "46 minutes ago",
			paymentStatus: "paid",
		},
		{
			table: 1,
			items: 4,
			time: "76 minutes ago",
			paymentStatus: "paid",
		},
	];
	return (
		<Flex margin={"0 10px"} w={"100%"} flexDirection={"row"}>
			{arr.map((val) => (
				<Card
					key={val.table}
					table={val.table}
					items={val.items}
					time={val.time}
					paymentStatus={val.paymentStatus}
				/>
			))}
		</Flex>
	);
}

function Card(props) {
	return (
		<Flex
			w={"100%"}
			justifyContent={"center"}
			alignItems={"center"}
			color={"white"}
			outline={"#282C2C 1px solid"}
			paddingLeft={"10px"}
		>
			<Flex w={"95%"} h={"70%"} flexDirection={"row"}>
				<Flex
					w={"20%"}
					bg={"#282C2C"}
					fontSize={"12px"}
					justifyContent={"center"}
					align={"center"}
					// borderRadius={"5px"}
					style={{ borderRadius: "5px" }}
				>
					T{props.table}
				</Flex>
				<Flex w={"70%"} paddingLeft={"10px"} color={"var(--text-l2)"}>
					<Stat>
						<StatNumber fontSize={"10"}>{props.time}</StatNumber>
						<StatHelpText>{props.items} items</StatHelpText>
					</Stat>
				</Flex>
			</Flex>
		</Flex>
	);
}
