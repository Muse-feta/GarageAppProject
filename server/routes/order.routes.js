const orderController = require("../controller/order.controller");

const router = require("express").Router();

router.post("/api/order", orderController.createOrder);
router.get("/api/orders", orderController.getAllOrders);
router.get("/api/order/:order_id", orderController.singleOrder);
router.put("/api/order/:order_id/:service_id", orderController.updateOrderServiceStatus);
router.put("/api/order/additional/requests/:order_id", orderController.updateOrderAdditionalRequests);
module.exports = router;
