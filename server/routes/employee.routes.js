// import express module
const express = require('express');
// import router from express
const router = express.Router();
//import employee cotroller from controller folder
const employeeController = require('../controller/employee.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.post(
  "/api/employee",  
  [verifyToken, isAdmin],
  employeeController.createEmployee
);

router.get(
  "/api/employees",[verifyToken, isAdmin],
  employeeController.getAllEmployees
)


// export the router
module.exports=router;
