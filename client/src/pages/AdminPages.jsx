import {
	Flex,
	Text,
	Stack,
	Input,
	InputGroup,
	InputLeftElement,
	Icon,
} from "@chakra-ui/react";
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
						<Flex className="adminCategory">
							<Stack spacing={4}>
								<Text
									px={"4"}
									fontSize={"24px"}
									fontWeight={"bold"}
									color={"black"}
								>
									Admin
								</Text>
								<InputGroup>
									<InputLeftElement pointerEvents="none">
										<Icon color="gray.300" />
									</InputLeftElement>
									<Input
										type="text"
										placeholder="Search Admin"
										minW={"20vw"}
										borderColor={"blackAlpha.300"}
									/>
								</InputGroup>
							</Stack>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
