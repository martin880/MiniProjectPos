const express = require("express");
const router = express.Router();
const categoryController = require("../controllers").categoryController;
//get

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/v1", categoryController.insertCategoryProduct);
router.patch("/v2/:id", categoryController.editCategoryProduct);
router.delete("/v3/:id", categoryController.deleteCategoryProduct);

module.exports = router;
