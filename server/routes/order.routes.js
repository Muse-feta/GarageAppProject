const orderController = require("../controller/order.controller");

const router = require("express").Router();

router.post("/api/order", orderController.createOrder);
router.get("/api/orders", orderController.getAllOrders);
router.put("/api/order/update/:order_id", orderController.updateOrder);
router.get("/api/order/:order_id", orderController.singleOrder);
router.put("/api/order/:order_id/:service_id", orderController.updateOrderServiceStatus);
router.put("/api/order/additional/requests/:order_id", orderController.updateOrderAdditionalRequests);
router.put("/api/order/update/order/status/:order_id", orderController.updateOrderStatus);
module.exports = router;
