import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
// import iconphoto from "../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export function EditProduct(props) {
  const [category, setCategory] = useState([]);
  const [SelectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [product, setProduct] = useState({
    productName: "",
    harga: "",
    stock: "",
    categoryId: "",
    photoProduct_url: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempProduct = { ...product };
    tempProduct[id] = value;
    console.log(tempProduct);
    setProduct(tempProduct);
  };

  useEffect(() => {
    api
      .get("/product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //
  const editProduct = async () => {
    // try {
    if (
      !(
        (
          product.productName ||
          product.stock ||
          product.harga ||
          product.categoryId
        )
        // &&
        // SelectedFile
      )
    ) {
      alert("isi semua");
    } else {
      //   const formData = new FormData();
      //   //   formData.append("product", SelectedFile);
      //   formData.append("productName", product.productName);
      //   formData.append("stock", product.stock);
      //   formData.append("harga", product.harga);
      //   formData.append("categoryId", product.categoryId);
      const result = await api.patch("/product/v2/" + props.id, product);

      alert("berhasil mengubah produk");
      props.onClose();
    }
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  //get daftar category
  //   useEffect(() => {
  //     async function getCategory() {
  //       const res = await api.get("/category/");
  //       console.log(res.data);
  //       setCategory(res.data);
  //     }
  //     getCategory();
  //   }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Input
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                type="file"
                display="none"
                // id="product_url"
              />
              {/* <Image
                src={iconphoto}
                w={"100px"}
                h={"100px"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              /> */}
              <Flex flexDir={"column"} w={"70%"}>
                Product Name
                <Input id="productName" onChange={inputHandler} />
                Price
                <Input id="harga" onChange={inputHandler} />
              </Flex>
            </Flex>
            <Box>
              Stock
              <Input id="stock" onChange={inputHandler} />
            </Box>
            <Box pt={5}>
              <Select
                placeholder="Pilih category.."
                id="categoryId"
                onChange={inputHandler}
              >
                {categories.map((category) => (
                  <option key={category.id} value={`${category.id}`}>
                    {category.categoryName}
                  </option>
                ))}
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={editProduct}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
