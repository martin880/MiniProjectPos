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
} from "@chakra-ui/react";
import { api } from "../api/api";

export function DeleteProduct(props) {
  console.log(props);
  const deleteProduct = async () => {
    await api.delete("/product/v3/" + props.id);
    alert("deleted");
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
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={deleteProduct}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
