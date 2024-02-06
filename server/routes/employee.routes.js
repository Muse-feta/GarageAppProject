// import express module
const express = require('express');
// import router from express
const router = express.Router();
//import employee cotroller from controller folder
const employeeController = require('../controller/employee.controller')

router.post("/api/employee", employeeController.createEmployee);


// export the router
module.exports=router;
