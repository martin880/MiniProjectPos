const express = require("express");
const router = express.Router();
const paymentController = require("../controllers").paymentController;
//get

router.get("/", paymentController.getAll);
router.get("/:id", paymentController.getById);
router.post("/v1", paymentController.insertPayment);
router.patch("/v2/:id", paymentController.editPayment);
router.delete("/v3/:id", paymentController.deletePayment);

module.exports = router;
