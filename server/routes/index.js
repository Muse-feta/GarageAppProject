// import express module
const express = require("express");
// import router from express
const router = express.Router();

// import employee.routes  file

const employeesRoutes = require('./employee.routes');
const loginRoutes = require('./login.routes');
const customerRoutes = require('./customer.routes');
const vehicleRoutes = require('./vehicle.routes');

//  use the middleware function to handle requests for /employees route

router.use(employeesRoutes);
router.use(loginRoutes);
router.use(customerRoutes);
router.use(vehicleRoutes);  

// export the router
module.exports = router;
