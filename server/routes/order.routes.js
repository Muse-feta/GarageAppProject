const orderController = require("../controller/order.controller");

const router = require("express").Router();

router.post("/api/order", orderController.createOrder);
router.get("/api/orders", orderController.getAllOrders);
module.exports = router;
