const express = require("express");
const router = express.Router();
const historyController = require("../controllers").historyController;
//get

router.get("/", historyController.getAll);
router.get("/:id", historyController.getById);
router.post("/v1", historyController.insertStockHistory);
router.patch("/v2/:id", historyController.editStockHistory);
router.delete("/v3/:id", historyController.deleteStockHistory);

module.exports = router;
