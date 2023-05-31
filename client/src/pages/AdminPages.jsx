import { Flex } from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

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
							{/* isi content */}
							{/* isi content */}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
