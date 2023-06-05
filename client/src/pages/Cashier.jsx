import { Divider, Flex } from "@chakra-ui/react";
import Category from "../components/Category";
import OrderDetails from "../components/OrderDetails";
import OrderHistory from "../components/OrderHistory";
import Product from "../components/Product";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import OrderPayment from "../components/OrderPayment";

export default function Cashier() {
	return (
		<>
			<Flex className="container">
				<Flex className="device">
					<Flex className="sidebar">
						<SideBar />
					</Flex>
					<Flex className="mainbar">
						<Flex className="topbar">
							<TopBar />
						</Flex>
						<Flex className="content">
							<Flex className="content-1">
								<Flex className="category">
									<Category />
								</Flex>
								<Flex className="divider">
									<Flex
										padding={"0 10px"}
										w={"100%"}
										h={"100%"}
									>
										<Divider
											h={"50%"}
											borderColor="rgba(179, 179, 179, 0.4)"
										/>
									</Flex>
								</Flex>
								<Flex className="product">
									<Product />
								</Flex>
								<Flex className="divider"></Flex>
								<Flex className="order-history">
									<OrderHistory />
								</Flex>
							</Flex>
							<Flex className="content-2">
								<Flex className="order-details">
									<OrderDetails />
								</Flex>
								<Flex className="order-payment">
									<OrderPayment />
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
