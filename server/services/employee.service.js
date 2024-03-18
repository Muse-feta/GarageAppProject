const pool =  require('../config/db.config');
const bcrypt = require('bcrypt') // this is used to encrypt the password

const isEmployeeExist = async (email) => {
    const query = `SELECT * FROM  employee WHERE employee_email=?`;
    const rows = await pool.query(query, [email]);
    console.log(rows)
    if(rows[0].length > 0){
        return true;
    }
    return  false;
}
const createEmployee = async (data) => {
    let createdEmployee = {}
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(
          data.employee_password_hashed,
          salt
        );

console.log(data.employee_password_hashed);
        const query = `INSERT INTO employee (employee_email, active_employee)  VALUES (?, ?)`;
        const rows = await pool.query(query, [data.employee_email,  data.active_employee])
        
        const employee_id = rows[0].insertId 

        if (rows[0].affectedRows !== 1) {
          return false;
        }

        const query2 = `INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)`;
        const rows2 = await pool.query(query2, [
          employee_id,
          data.employee_first_name,
          data.employee_last_name,
          data.employee_phone,
        ]);

        const query3 = `INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)`;
        const rows3 = await pool.query(query3, [employee_id, hashPassword]);

        // const query5 = `INSERT INTO company_roles (company_role_name) VALUES (?)`;
        // const rows5 = await pool.query(query5, [data.company_role_name]);

        // const company_role_id = rows5[0].insertId

        const query4 = `INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)`;
        const rows4 = await pool.query(query4, [
          employee_id,
          data.company_role_id
        ]);

        createdEmployee = {
            employee_id,
            employee_email: data.employee_email,
            active_employee: data.active_employee,
            employee_first_name: data.employee_first_name,
            employee_last_name: data.employee_last_name,
            employee_phone: data.employee_phone,
            company_role_id: data.company_role_id
        }
        return createdEmployee

    } catch (error) {
        console.log(error)
    }
}

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee_email = ?`;
  const rows = await pool.query(query, [email]);
  return rows[0];
};

const getAllEmployees = async () => {
  const query = `SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC LIMIT 10`;
  const rows = await pool.query(query);
  return rows[0];
}

const getEmployeeById = async (employee_id) => {
  const query = `SELECT * FROM employee_info INNER JOIN employee_role ON employee_info.employee_id = employee_role.employee_id INNER JOIN employee ON employee_role.employee_id = employee.employee_id WHERE employee_info.employee_id = ?`;
  const rows = await pool.query(query, [employee_id]);
  return rows[0]; 
};


module.exports = { isEmployeeExist, createEmployee, getUserByEmail, getAllEmployees, getEmployeeById };