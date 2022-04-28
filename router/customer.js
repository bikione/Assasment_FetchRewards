const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.route("/balance").get(customerController.getBalance);
router.route("/").post(customerController.addToQue);
router.route("/spend").post(customerController.spentPoint);

module.exports = router;
