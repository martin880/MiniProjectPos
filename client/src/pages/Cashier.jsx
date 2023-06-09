import { Divider, Flex } from "@chakra-ui/react";
import Category from "../components/Category";
import OrderDetails from "../components/OrderDetails";
import OrderHistory from "../components/OrderHistory";
import Product from "../components/Product";
import SideBar from "../components/SideBar";
import SideBarAdmin from "../components/SideBarAdmin";
import TopBar from "../components/TopBar";
import TopBarAdmin from "../components/TopBarAdmin";
import OrderPayment from "../components/OrderPayment";
import CustInformation from "../components/CustInformation";
import { useSelector } from "react-redux";
// import { orderInfo } from "../redux/modalManager";
// import { customerInfo } from "../redux/customerInfo";

export default function Cashier() {
	const modalManager = useSelector((state) => state.modalManager);
	// const orderType = useSelector((state) => state.orderType.value);
	const userInfo = useSelector((state) => state.customerInfo);

	function PrintVal() {
		console.log("ModalManager > orderinfo", modalManager.orderInfo);
		console.log("userInfo", userInfo);
	}

	return (
		<>
			<Flex className="container">
				<Flex className="device" position={"relative"} zIndex={0}>
					<Flex className="sidebar">
						<SideBar />
						{/* <SideBarAdmin /> */}
					</Flex>
					<Flex className="mainbar">
						<Flex className="topbar">
							<TopBar />
							{/* <TopBarAdmin /> */}
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
				<Flex
					className={`device-modal ${
						modalManager.orderInfoModal ? "visible" : ""
					}`}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<CustInformation />
				</Flex>
				{/* <Flex
					className="device-modal"
					position={"absolute"}
					zIndex={3}
					// bg={"red"}
					// display={"none"}
					// display={modalCust === false ? "none" : "block"}
					visibility={!modalCust ? "block" : "hidden"}
					justifyContent={"center"}
					alignItems={"center"}
					cursor={"pointer"}
					onClick={() => {
						setModalCust(true);
					}}
				>
					<Flex
						w={"90%"}
						h={"90%"}
						// bg={"red"}
						flexDirection={"column"}
						alignItems={"center"}
						justifyContent={"space-between"}
						padding={"5% 0"}
						fontFamily={"var(--font)"}
						fontSize={"18px"}
						zIndex={5}
					>
						<Flex
							w={"90%"}
							h={"85%"}
							bg={"#f5f8f7"}
							border={"2px #CFFB1F solid"}
							borderRadius={"25px"}
							flexDirection={"row"}
							padding={"20px"}
							gap={"15px"}
						>
							<Flex
								w={"70%"}
								// bg={"red.200"}
								flexDirection={"column"}
								gap={"15px"}
							>
								<Flex
									h={"30%"}
									bg={"#d0d4e7"}
									flexDirection={"column"}
									padding={"15px "}
									borderRadius={"20px"}
								>
									<Flex>Customer Name:</Flex>
									<Flex
										w={"full"}
										h={"full"}
										// bg={"purple.100"}
										fontWeight={"bold"}
										alignItems={"end"}
										// justifyContent={"end"}

										color={"#233300"}
										flexDirection={"row"}
										paddingLeft={"30px"}
									>
										<Flex
											alignItems={"flex-end"}
											fontSize={"70px"}
											h={"full"}
											w={"fit-content"}
											paddingRight={"10px"}
										>
											John Doe
										</Flex>
										<Flex
											bg={"#CFFB1F"}
											h={"10px"}
											w={"10%"}
											borderRadius={"10px"}
											marginBottom={"3%"}
											border={"1px solid #688902"}
										></Flex>
									</Flex>
								</Flex>
								<Flex
									h={"70%"}
									padding={"15px"}
									flexDir={"column"}
									bg={"#d0d4e7"}
									borderRadius={"20px"}
								>
									<Flex>Select Table:</Flex>
									<Flex
										w={"full"}
										h={"full"}
										// bg={"purple.100"}
										justifyContent={"end"}
										// alignItems={"center"}
										padding={"25px"}
									>
										<Table />
									</Flex>
								</Flex>
							</Flex>
							<Flex
								w={"30%"}
								// bg={"green.200"}
								flexDirection={"column"}
								justifyContent={"space-between"}
								gap={"15px"}
							>
								<Flex
									h={"70%"}
									bg={"#d0d4e7"}
									padding={"15px"}
									flexDir={"column"}
									borderRadius={"20px"}
								>
									<Flex>Delivery Courier:</Flex>
									<Flex
										w={"full"}
										h={"full"}
										// bg={"purple.100"}
										flexDir={"column"}
										justifyContent={"space-evenly"}
									>
										<Flex
											className="kurir"
											bg={"#d0fb20"}
											fontWeight={"bold"}
											border={"1px solid #688902"}
										>
											<BiCycling />
											<span
												style={{ paddingLeft: "10px" }}
											>
												Gojek
											</span>
										</Flex>
										<Flex className="kurir">
											<BiCycling />
											<span
												style={{ paddingLeft: "10px" }}
											>
												Grab
											</span>
										</Flex>
										<Flex className="kurir">
											<BiCycling />
											<span
												style={{ paddingLeft: "10px" }}
											>
												Maxim
											</span>
										</Flex>
										<Flex className="kurir">
											<BiCycling />
											<span
												style={{ paddingLeft: "10px" }}
											>
												Store
											</span>
										</Flex>
									</Flex>
								</Flex>
								<Flex
									h={"30%"}
									bg={"#d0d4e7"}
									padding={"15px"}
									flexDir={"column"}
									borderRadius={"20px"}
								>
									<Flex>Cutlery:</Flex>
									<Flex
										w={"full"}
										h={"full"}
										// bg={"purple.100"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<Flex
											w={"80%"}
											h={"75%"}
											bg={"#d0fb20"}
											borderRadius={"90px"}
											justifyContent={"center"}
											alignItems={"center"}
											fontSize={"30px"}
											fontWeight={"bold"}
											border={"1px solid #688902"}
										>
											<BiWorld />{" "}
											<span
												style={{ paddingLeft: "6px" }}
											>
												No
											</span>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
						<Flex
							h={"9%"}
							w={"100%"}
							flexDirection={"row"}
							gap={4}
							justifyContent={"center"}
						>
							<Flex
								w={"50%"}
								bg={"#151e1e"}
								borderRadius={"20px"}
								flexDirection={"row"}
								justifyContent={"space-evenly"}
								fontFamily={"var(--font)"}
								fontSize={"20px"}
								fontWeight={"500"}
								color={"#70918d"}
							>
								<Flex className="modal-menu" color={"#f5f8f7"}>
									<Flex>Dine In</Flex>
									<Flex
										w={"15px"}
										h={"10%"}
										bg={"whiteAlpha.800"}
										borderRadius={"5px"}
									></Flex>
								</Flex>
								<Flex className="modal-menu">
									<Flex>Take Away</Flex>
									<Flex
										w={"15px"}
										h={"10%"}
										bg={"whiteAlpha.400"}
										borderRadius={"5px"}
									></Flex>
								</Flex>
								<Flex className="modal-menu">
									<Flex>Delivery</Flex>
									<Flex
										w={"15px"}
										h={"10%"}
										bg={"whiteAlpha.400"}
										borderRadius={"5px"}
									></Flex>
								</Flex>
								<Flex
									className="modal-menu"
									color={"whiteAlpha.400"}
								>
									<Flex>Reservation</Flex>
									<Flex
										w={"15px"}
										h={"10%"}
										bg={"whiteAlpha.400"}
										borderRadius={"5px"}
									></Flex>
								</Flex>
							</Flex>
							<Flex
								w={"10%"}
								bg={"#500d00"}
								borderRadius={"20px"}
								flexDirection={"row"}
								justifyContent={"space-evenly"}
								fontFamily={"var(--font)"}
								fontSize={"20px"}
								fontWeight={"500"}
								color={"#70918d"}
							>
								<Flex className="modal-menu" color={"#ffcbc1"}>
									<Flex>Exit</Flex>
									<Flex
										w={"15px"}
										h={"10%"}
										bg={"#ffcbc1"}
										borderRadius={"5px"}
									></Flex>
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				</Flex> */}
			</Flex>
			{/* <Flex
				zIndex={10}
				bg={"red"}
				onClick={() => {
					PrintVal();
				}}
				cursor={"pointer"}
			>
				PRINT
			</Flex> */}
		</>
	);
}
