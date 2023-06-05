const express = require("express");
const router = express.Router();
const productController = require("../controllers").productController;
//get

router.get("/", productController.getAll);
router.post("/v1", productController.insertProduct);
router.patch("/v2/:id", productController.editProduct);
router.delete("/v3/:id", productController.deleteProduct);
router.get("/:id", productController.getById);

module.exports = router;
