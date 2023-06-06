const express = require("express");

const router = express.Router();
const userController = require("../controllers").userController;

router.post("/v2", userController.loginV2);
router.post("/", userController.register);

router.get("/getall", userController.getAll);
router.get("/v5", userController.getUserByName);

router.delete("/del/:id", userController.deleteUser); // delete user

router.get("/token", userController.getByToken); // get Token
router.get("/v3", userController.getByToken, userController.getUserByToken);
// mendapatkan user dari token di path. apakah token expired? kalau tidek kirim user
router.patch("/update/:id", userController.updateProfile); //update profile
router.patch("/v4", userController.getByToken, userController.changePassword);

router.get("/generate-token/email", userController.generateTokenByEmail);
// router.post(
//   "/image/v1/:id",
//   fileUploader({ destinationFolder: "avatar" }).single("avatar"),
//   userController.uploadAvatar
// );
router.get("/image/render/:id", userController.renderAvatar);

//mendapatkan user dari token di path. apakah token exp ? kalau tidak kirim user

module.exports = router;
