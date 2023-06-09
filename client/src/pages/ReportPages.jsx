import React from "react";
import { Flex, SimpleGrid, Text, Box, Icon } from "@chakra-ui/react";
import SideBar from "../components/SideBar";
import TopBarAdmin from "../components/TopBarAdmin";
import { BsArrowUpRight } from "react-icons/bs";

const ReportPages = () => {
	return (
		<>
			<Flex className="container">
				<Flex className="device" bg={"whitesmoke"}>
					<Flex className="sidebar">
						<SideBar />
					</Flex>
					<Flex w={"80%"} h={"100%"} flexDir={"column"}>
						<Flex className="topbar">
							<TopBarAdmin />
						</Flex>
						<SimpleGrid minChildWidth="120px" spacing="30px" p={4}>
							<Box
								border={"1px solid black"}
								borderRadius={"10px"}
								height="80px"
							>
								<Flex>
									<Text
										fontSize={"10px"}
										p={4}
										color={"gray"}
										fontFamily={"serif"}
										fontWeight={"medium"}
									>
										Gross Sales
									</Text>
								</Flex>
								<Flex>
									<Text
										fontSize={"14px"}
										p={4}
										color={"black"}
										fontFamily={"sans-serif"}
										fontWeight={"bold"}
									>
										Rp.8.999.990
									</Text>
									<Flex flexDir={"column"}>
										<Text
											fontSize={"8px"}
											p={6}
											color={"green"}
											fontFamily={"sans-serif"}
											fontWeight={"bold"}
										>
											9.10%
										</Text>
									</Flex>
								</Flex>
							</Box>
							<Box
								border={"1px solid black"}
								borderRadius={"10px"}
								height="80px"
							>
								<Flex>
									<Text
										fontSize={"10px"}
										p={4}
										color={"gray"}
										fontFamily={"serif"}
										fontWeight={"medium"}
									>
										Gross Sales
									</Text>
								</Flex>
								<Flex>
									<Text
										fontSize={"14px"}
										p={4}
										color={"black"}
										fontFamily={"sans-serif"}
										fontWeight={"bold"}
									>
										Rp.8.999.990
									</Text>
									<Flex flexDir={"column"}>
										<Text
											fontSize={"8px"}
											p={6}
											color={"green"}
											fontFamily={"sans-serif"}
											fontWeight={"bold"}
										>
											9.10%
										</Text>
									</Flex>
								</Flex>
							</Box>
							<Box
								border={"1px solid black"}
								borderRadius={"10px"}
								height="80px"
							>
								<Flex>
									<Text
										fontSize={"10px"}
										p={4}
										color={"gray"}
										fontFamily={"serif"}
										fontWeight={"medium"}
									>
										Gross Sales
									</Text>
								</Flex>
								<Flex>
									<Text
										fontSize={"14px"}
										p={4}
										color={"black"}
										fontFamily={"sans-serif"}
										fontWeight={"bold"}
									>
										Rp.8.999.990
									</Text>
									<Flex flexDir={"column"}>
										<Text
											fontSize={"8px"}
											p={6}
											color={"green"}
											fontFamily={"sans-serif"}
											fontWeight={"bold"}
										>
											9.10%
										</Text>
									</Flex>
								</Flex>
							</Box>
							<Box
								border={"1px solid black"}
								borderRadius={"10px"}
								height="80px"
							>
								<Flex>
									<Text
										fontSize={"10px"}
										p={4}
										color={"gray"}
										fontFamily={"serif"}
										fontWeight={"medium"}
									>
										Gross Sales
									</Text>
								</Flex>
								<Flex>
									<Text
										fontSize={"14px"}
										p={4}
										color={"black"}
										fontFamily={"sans-serif"}
										fontWeight={"bold"}
									>
										Rp.8.999.990
									</Text>
									<Flex flexDir={"column"}>
										<Text
											fontSize={"8px"}
											p={6}
											color={"green"}
											fontFamily={"sans-serif"}
											fontWeight={"bold"}
										>
											9.10%
										</Text>
									</Flex>
								</Flex>
							</Box>
						</SimpleGrid>
						<SimpleGrid columns={2} spacingX="40px" spacingY="20px">
							<Box bg="tomato" height="80px"></Box>
							<Box bg="tomato" height="80px"></Box>
						</SimpleGrid>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default ReportPages;
