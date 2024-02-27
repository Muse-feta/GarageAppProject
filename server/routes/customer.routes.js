const router = require('express').Router();
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const customerController = require('../controller/customer.controller');


router.post("/api/customer",[verifyToken, isAdmin], customerController.createCustomer);
// router.get('/api/customers', customerController.getAllCustomers);
module.exports = router