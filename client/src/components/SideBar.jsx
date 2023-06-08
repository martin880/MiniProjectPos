import { Avatar, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { dineIn, takeAway, delivery, reservation } from "../redux/orderType";

export default function SideBar() {
	const orderType = useSelector((state) => state.orderType.value);
	const dispatch = useDispatch();
	return (
		<>
			<Grid w="100%" templateRows="repeat(15, 1fr)" gap={3}>
				<GridItem gridRow={"1/3"} w="100%" color={"whitesmoke"}>
					<Flex className="logo">CosyPOS</Flex>
				</GridItem>

				<GridItem w="100%" gridRow={"3/8"}>
					<Flex
						className="menu"
						paddingLeft={"20px"}
						paddingRight={"20px"}
					>
						<Flex
							bgColor={
								orderType === "Dine In"
									? "var(--section-color)"
									: "none"
							}
							className="menu-list"
							onClick={() => {
								dispatch(dineIn());
							}}
						>
							Dine In
						</Flex>
						<Flex
							bgColor={
								orderType === "Take Away"
									? "var(--section-color)"
									: "none"
							}
							className="menu-list"
							onClick={() => {
								dispatch(takeAway());
							}}
						>
							Take Away
						</Flex>
						<Flex
							bgColor={
								orderType === "Delivery"
									? "var(--section-color)"
									: "none"
							}
							className="menu-list"
							onClick={() => {
								dispatch(delivery());
							}}
						>
							Delivery
						</Flex>
						<Flex
							bgColor={
								orderType === "Reservation"
									? "var(--section-color)"
									: "none"
							}
							className="menu-list"
							onClick={() => {
								dispatch(reservation());
							}}
						>
							Reservation
						</Flex>
						<Flex className="menu-list">Order Summary</Flex>
					</Flex>
				</GridItem>

				<GridItem w="100%" gridRow={"11/15"} paddingLeft={"20px"}>
					<Flex className="users" visibility={"hidden"}>
						<Flex>
							<Avatar
								name="Susi Pujiastuti"
								src="#"
								size={"sm"}
							/>
						</Flex>

						<Flex paddingLeft={"15px"}>Susi P.</Flex>
					</Flex>
					<Flex className="users" visibility={"hidden"}>
						<Flex>
							<Avatar
								name="Mamud M"
								src="https://bit.ly/kent-c-dodds"
								size={"sm"}
							/>
						</Flex>

						<Flex paddingLeft={"15px"}>Mahfud M.</Flex>
					</Flex>
					<Flex className="users">
						<Flex>
							<Avatar
								name="Jowo K."
								src="https://bit.ly/dan-abramov"
								size={"sm"}
							/>
						</Flex>

						<Flex paddingLeft={"15px"}>Jowo K.</Flex>
					</Flex>
				</GridItem>

				<GridItem w="100%" gridRow={"15"} paddingLeft={"40px"}>
					<Flex
						alignItems={"center"}
						h={"100%"}
						color={"rgba(179, 179, 179, 0.5)"}
						fontSize={"14px"}
					>
						Order: COF-0239-000-01
					</Flex>
				</GridItem>
			</Grid>
		</>
	);
}
