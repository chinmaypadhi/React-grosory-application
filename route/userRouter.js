const express = require("express");

const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/changePassword",
  authController.protect,
  authController.updatePassword
);

router.get(
  "/proceedtocheckout",
  authController.protect,
  userController.proceedToCheckout
);

// router.post("/createUser", userController.createUser);
// router.get("/getAllUser", userController.getAllUser);

router.patch(
  "/updateMe",
  authController.protect,
  userController.upload.single("photo"),
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch("/deleteMe", authController.protect, userController.deleteMe);

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUser);
//authController.protect,
// router.get("/:id", userController.getUserById);
// router.patch("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(
    // authController.protect,
    // authController.restrictTo("admin"),
    userController.deleteUser
  );
module.exports = router;
