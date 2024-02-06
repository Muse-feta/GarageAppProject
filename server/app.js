const express = require('express')
const app = express()
const pool = require('./config/db.config');
const { employee, employee_info, employee_pass, customerIdentifier, customer_info, customer_vehicle_info, company_roles, common_services, employee_role, orders, order_info, order_services, order_status } = require('./model/model');
const router = require('./routes');
require("dotenv").config();
const PORT = process.env.PORT


// parse incoming requests data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router);


const startApp = async () => {
    pool.getConnection()
    console.log('Database Connected Succefully') 
    try {
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        })
        pool.query(customerIdentifier)
        pool.query(customer_info)
        pool.query(customer_vehicle_info)
        pool.query(company_roles)
        pool.query(common_services)
        pool.query(employee)
        pool.query(employee_info)
        pool.query(employee_pass)
        pool.query(employee_role)
        pool.query(orders)
        pool.query(order_info)
        pool.query(order_services)
        pool.query(order_status)
        console.log('all tables has been created')
    } catch (error) {
        console.log(error)
    }
}

startApp();

