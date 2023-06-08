import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Center,
	Box,
	Flex,
	useToast,
} from "@chakra-ui/react";
import { api } from "../api/api";

export function DeleteUser(props) {
	const toast = useToast();
	console.log(props);
	const deleteUser = async () => {
		await api.delete("/auth/del/" + props.id);
		toast({
			title: "Success Delete.",
			status: "success",
			duration: 3000,
			position: "top-right",
			isClosable: false,
		});
		props.onClose();
	};

	return (
		<>
			<Modal onClose={props.onClose} size={"xs"} isOpen={props.isOpen}>
				<ModalOverlay />
				<ModalContent mt={"300px"}>
					<ModalHeader>Konfirmasi Hapus Data </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Apakah anda yakin akan menghapus data dengan id {props.id}?
					</ModalBody>
					<ModalFooter gap={5}>
						<Button onClick={props.onClose} colorScheme="yellow">
							Cancel
						</Button>
						<Button onClick={deleteUser} colorScheme="red">
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
