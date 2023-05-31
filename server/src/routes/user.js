const express = require("express");

const router = express.Router();
const userController = require("../controllers").userController;

router.post("/v2", userController.loginV2); //login
router.post("/", userController.register); //register

//mendapatkan user dari token di path. apakah token exp ? kalau tidak kirim user

module.exports = router;
