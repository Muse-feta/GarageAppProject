const customerService = require("../services/customer.service")

const createCustomer = async (req, res) => {

    const customerExist = await customerService.isCustomerExist(req.body.customer_email);

    if(customerExist.length > 0) {
        return res.status(403).json({"success": false, error: 'Customer with this email already exist'});
    }
    
    try {
        const customer = await customerService.createCustomer(req.body);
        if (!customer) {
          return res
            .status(500)
            .json({ success: false, message: "failed to create new customer" });
        } else {
          return res
            .status(201)
            .json({
              success: true,
              message: "Customer has been created successfully",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const customerController = { 
    createCustomer
}
module.exports = customerController