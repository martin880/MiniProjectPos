import { Divider, Flex } from "@chakra-ui/react";
import Category from "../components/Category";
import OrderDetails from "../components/OrderDetails";
import OrderHistory from "../components/OrderHistory";
import Product from "../components/Product";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import OrderPayment from "../components/OrderPayment";

export default function Modale() {
	return (
		<>
			<Flex className="container">
				<Flex className="device" bg={"red"}></Flex>
			</Flex>
		</>
	);
}
