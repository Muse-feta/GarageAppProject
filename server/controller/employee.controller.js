const employeeService = require("../services/employee.service")

const createEmployee = async (req, res, next) => {
    // console.log(req.headers)
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

const getAllEmployees = async (req, res, next) => {
    const employee = await employeeService.getAllEmployees();
    if(!employee){
        return res.status(500).send('failed to get all employees')
    }else{
        return res.status(200).json({success: true, data: employee})
    }
}

const getEmployeeById = async (req, res, next) => {
    const employee = await employeeService.getEmployeeById(req.params.employee_id);
    if(!employee){
        return res.status(500).send('failed to get employee')
    }else{
        return res.status(200).json({success: true, data: employee})
    }
}

module.exports = {createEmployee, getAllEmployees, getEmployeeById}