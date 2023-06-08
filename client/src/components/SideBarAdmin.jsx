import { Avatar, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { dineIn, takeAway, delivery, reservation } from "../redux/orderType";

export default function SideBarAdmin() {
	const orderType = useSelector((state) => state.orderType.value);
	const dispatch = useDispatch();
	return (
		<>
			<Grid
				w="100%"
				templateRows="repeat(15, 1fr)"
				gap={3}
				bg={"#f2f2f2"}
			>
				<GridItem gridRow={"1/3"} w="100%" color={"whitesmoke"}>
					<Flex className="logo" color={"#282828"}>
						CosyPOS
					</Flex>
				</GridItem>

				<GridItem w="100%" gridRow={"3/8"}>
					<Flex
						className="menu"
						paddingLeft={"20px"}
						paddingRight={"20px"}
					>
						<Flex className="menu-list-admin">Report</Flex>
						<Flex className="menu-list-admin">Products</Flex>
						<Flex className="menu-list-admin">Staff</Flex>
						<Flex className="menu-list-admin">Inventory</Flex>
						<Flex className="menu-list-admin">Download</Flex>
					</Flex>
				</GridItem>

				<GridItem w="100%" gridRow={"11/15"} paddingLeft={"20px"}>
					<Flex className="users" visibility={"hidden"}>
						<Flex>
							<Avatar name="Lorem" src="#" size={"sm"} />
						</Flex>

						<Flex paddingLeft={"15px"}>Lorem</Flex>
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
					<Flex className="users-admin">
						<Flex>
							<Avatar
								name="Nama Admin"
								src="https://bit.ly/dan-abramov"
								size={"sm"}
							/>
						</Flex>

						<Flex paddingLeft={"15px"} color={"#4e4e4e"}>
							Nama Admin
						</Flex>
					</Flex>
				</GridItem>

				<GridItem w="100%" gridRow={"15"} paddingLeft={"40px"}>
					<Flex
						alignItems={"center"}
						h={"100%"}
						color={"#818181"}
						fontSize={"14px"}
					>
						Signature ID: <br /> CVD-23332-AD
					</Flex>
				</GridItem>
			</Grid>
		</>
	);
}
