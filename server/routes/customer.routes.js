const router = require('express').Router();
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const customerController = require('../controller/customer.controller');


router.post("/api/customer",
// [verifyToken, isAdmin],
 customerController.createCustomer);
router.get('/api/customers', customerController.getAllCustomers);
router.put("/api/customer/:customer_id", customerController.updateCustomer);
router.get("/api/customer/:customer_id", customerController.getCustomerById);
// delete a customer
router.delete("/api/customer/:customer_id", customerController.deleteCustomer);
router.get('/api/search/customer/:q', customerController.searchCustomer);

module.exports = router