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

const getAllOrders = async (req, res) => {
    const orders = await order_service.getAllOrders();
    if(!orders){
        return res.status(500).send('failed to get all orders')
    }else{
        return res.status(200).json({success: true, data: orders})
    }
}

const orderController = { createOrder, getAllOrders };
module.exports = orderController