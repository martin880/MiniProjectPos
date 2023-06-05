import {
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Stat,
	StatHelpText,
	StatNumber,
} from "@chakra-ui/react";
import { CiSearch, CiEdit } from "react-icons/ci";

export default function TopBar() {
	return (
		<>
			<Flex className="top-container">
				<Flex className="top-spacing" paddingLeft={"10px"}>
					<InputGroup
						bg={"var(--greyopa)"}
						w={"70%"}
						borderColor={"#111314"}
						// borderRadius={"6px"}
						style={{ borderRadius: "6px" }}
					>
						{" "}
						<InputLeftElement>
							<CiSearch color="var(--text-l3)" size={"30px"} />
						</InputLeftElement>
						<Input
							type="text"
							placeholder="Search"
							color="#595959"
						/>
					</InputGroup>
				</Flex>
				<Flex
					className="top-spacing"
					justifyContent={"end"}
					paddingRight={"20px"}
				>
					<Flex className="table">
						<Stat>
							<StatNumber>Table 5</StatNumber>
							<StatHelpText>Customer Name</StatHelpText>
						</Stat>
					</Flex>
					<CiEdit
						color="var(--text-l2)"
						size={"30px"}
						// borderRadius={"10px"}
						style={{ borderRadius: "10px" }}
						border={"2px red solid"}
					/>
				</Flex>
			</Flex>
		</>
	);
}
