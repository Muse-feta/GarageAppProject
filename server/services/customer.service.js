const pool = require("../config/db.config");

const isCustomerExist = async (email) => {
    const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;
    const rows = await pool.query(query, [email]);
    console.log("customer rows", rows[0]);
    return rows[0];
}
const createCustomer = async(customer) => {
    const query = `INSERT INTO customer_identifier (customer_email, customer_phone_number) VALUES (?, ?)`;
    const rows = await pool.query(query, [customer.customer_email, customer.customer_phone_number]);
    const customer_id = rows[0].insertId;

    const query2 = `INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)`;
    const rows2 = await pool.query(query2, [customer_id, customer.customer_first_name, customer.customer_last_name, customer.active_customer_status]);

    const createdCustomer = {
        customer_id,
        customer_email: customer.customer_email,
        customer_phone_number: customer.customer_phone_number,
        customer_first_name: customer.customer_first_name,
        customer_last_name: customer.customer_last_name,
        active_customer_status: customer.active_customer_status
    }
    return createdCustomer
}

const customerService = {
    createCustomer, isCustomerExist
}
module.exports = customerService