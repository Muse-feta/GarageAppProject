const loginServices = require('../services/login.service');
// import jsonwebtoken
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res, next) => {
    try {
        const employeeData = req.body
        const employee = await loginServices.login(employeeData)
        if(employee.success === false){
            return res.status(403).json({error: employee.message})
        }
        const payload = {
            email: employee.employee_email,
            first_name: employee.employee_first_name,
            employee_role: employee.employee_role
        }
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1d'})
        const sendBack = {
            employee_token: token
        }
        return res.status(200).json({success: true, token: token, token: sendBack})
    } catch (error) {
        console.log(error)
    }
}


// export the login controller
module.exports = {
    login
}