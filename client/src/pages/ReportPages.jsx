import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";

const ReportPages = () => {
	return (
		<>
			<Flex className="container">
				<Flex className="device" bg={"whitesmoke"}>
					<Flex className="sidebar">
						<SideBar />
					</Flex>
					<Flex w={"80%"} h={"100%"} flexDir={"column"}>
						<Text fontSize={"24px"} fontWeight={"bold"} color={"black"}>
							Report Pages
						</Text>
						<Flex className="topbar">
							<TopBar />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default ReportPages;
