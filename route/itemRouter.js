const express = require("express");
const itemController = require("../controller/itemController");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/uploadItem", itemController.createItem);

// router.get("/getAllItem", authController.protect, itemController.getAllItem);
router
  .route("/")
  .post(itemController.createItem)
  .get(itemController.getAllItem);

// router.get("/:id", itemController.getTheItem);

// router.patch("/:id", itemController.updateItem);

// router.delete("/:id", itemController.deleteItem);

router
  .route("/:id")
  .get(itemController.getTheItem)
  .patch(itemController.updateItem)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    itemController.deleteItem
  );
module.exports = router;
