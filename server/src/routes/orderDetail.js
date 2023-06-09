const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers").orderDetailController;
//get

router.get("/", orderDetailController.getAll);
router.get("/bydate", orderDetailController.getOrderDetailByDate);
router.get("/:id", orderDetailController.getById);
router.post("/v1", orderDetailController.insertOrderDetailAndOrder);
router.patch("/v2/:id", orderDetailController.editOrderDetail);
router.delete("/v3/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
