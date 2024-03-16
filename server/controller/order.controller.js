const order_service = require("../services/order.service");

 


const createOrder = async (req, res) => {
    const orderData = req.body
  try {
      const order = await order_service.createOrder(orderData);
      console.log(order)
      if (order) {
        res.status(200).json({
          success: true,
          message: "Order has been created successfully",
        });
      } else {
        res
          .status(500)
          .json({ success: false, message: "failed to create order" });
      }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const orderController = { createOrder };
module.exports = orderController