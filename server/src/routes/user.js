const express = require("express");

const router = express.Router();
const userController = require("../controllers").userController;
router.get("/", userController.getAll);
router.get("/token", userController.getByToken);
// router.get('/token2', userController.getByTokenV2);
router.get("/v3", userController.getByTokenV2, userController.getUserByToken);
//mendapatkan user dari token di path. apakah token exp ? kalau tidak kirim user
router.get("/:id", userController.getById);
router.post("/v2", userController.loginV2); //login
router.post("/", userController.register); //register
//register

router.patch("/v4", userController.getByTokenV2, userController.changePassword);
router.post("/generate-token/email", userController.generateTokenByEmail);

module.exports = router;
