const orderController = require("../controller/order.controller");

const router = require("express").Router();

router.post("/api/order", orderController.createOrder);
module.exports = router;
