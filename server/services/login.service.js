
const employeeService = require('../services/employee.service');
const pool = require('../config/db.config');
const bcrypt = require('bcrypt')

const login = async (employeeData) => {
  try {
    console.log(employeeData);
    const employee = await employeeService.getUserByEmail(employeeData.employee_email);
    console.log(employee)
    if(employee.length === 0){
      const returnData = {
        success: false,
        message: 'Invalid email'
      }
      return returnData
    }
   const isPasswordMatch = await bcrypt.compare(
     employeeData.employee_password,
     employee[0].employee_password_hashed,
   );
    if(!isPasswordMatch){
      const returnData = {
        success: false,
        message: 'Invalid password'
      }
      return returnData
    }
    const returnData = {
      success: true,
      data: employee[0],
    }
    return returnData
  } catch (error) {
    console.log(error);
  }
};

// export the functions
module.exports = {
  login,
};
