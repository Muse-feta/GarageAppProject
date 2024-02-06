const employeeService = require("../services/employee.service")

const createEmployee = async (req, res, next) => {
    const employeeExist = await employeeService.isEmployeeExist(req.body.employee_email);
    if(employeeExist){
        return res.status(403).json({error: 'Employee with this email already exist'})
    }else{
        try {
            const employeeData = req.body
            const employee =  await employeeService.createEmployee(employeeData)
            console.log(employee)
            if(!employee){
                return res.status(500).send('failed to create new employee')
            }else{

                return res.status(201).json({success: true, message: 'Employee has been created successfully'})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

module.exports = {createEmployee}