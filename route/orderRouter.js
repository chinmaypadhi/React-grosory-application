const express = require("express");
const itemController = require("../controller/itemController");
const router = express.Router();

router.post("/newOrder", itemController.createOrder);
router.get("/orderdetails", itemController.getOrderDetails);
router.delete("/cancelorder/:id", itemController.deleteOrder);
module.exports = router;
