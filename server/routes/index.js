// import express module
const express = require("express");
// import router from express
const router = express.Router();

// import employee.routes  file
const employeesRoutes = require('./employee.routes');
const loginRoutes = require('./login.routes');

//  use the middleware function to handle requests for /employees route
router.use(employeesRoutes);
router.use(loginRoutes);

// export the router
module.exports = router;