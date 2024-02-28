const pool = require("../config/db.config");

const isCustomerExist = async (email) => {
    const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;
    const rows = await pool.query(query, [email]);
    console.log("customer rows", rows[0]);
    return rows[0];
}
const createCustomer = async(customer, customer_hash) => {
    const query = `INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)`;
    const rows = await pool.query(query, [customer.customer_email, customer.customer_phone_number, customer_hash]);
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

// update customer service
const updateCustomer = async (customer_id, customer) => {
    console.log(customer_id, customer)
    const query = `UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?`;
    const rows = await pool.query(query, [
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
      customer_id,
    ]);
     const query2 = `UPDATE customer_identifier SET customer_phone_number = ? WHERE customer_id = ?`;
    const rows2 = await pool.query(query2, [
      customer.customer_phone_number,
      customer_id,
    ]);

    return {
      customer_id,
      customer_email: customer.customer_email,
      customer_phone_number: customer.customer_phone_number,
      customer_first_name: customer.customer_first_name,
      customer_last_name: customer.customer_last_name,
      active_customer_status: customer.active_customer_status,
    };
}

const getCustomerById = async (customer_id) => {
    const query = `SELECT * FROM customer_info INNER JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id WHERE customer_info.customer_id = ?`;
    const rows = await pool.query(query, [customer_id]);
    return rows[0];
}

const getAllCustomers = async () => {
    const query = `SELECT * FROM customer_info INNER JOIN customer_identifier ON customer_info.customer_id = customer_identifier.customer_id ORDER BY customer_info.customer_id DESC LIMIT 10`;
    const rows = await pool.query(query);
    return rows[0];
}

const deleteCustomer = async (customer_id) => {
    const query = `DELETE FROM customer_info WHERE customer_id = ?`;
    const rows = await pool.query(query, [customer_id]);
    const query2 = `DELETE FROM customer_identifier WHERE customer_id = ?`;
    const rows2 = await pool.query(query2, [customer_id]);
    const query3 = `DELETE FROM customer_vehicle_info WHERE customer_id = ?`;
    const rows3 = await pool.query(query3, [customer_id]);
    // return 2 rows
    return rows3;
}

const customerService = {
    createCustomer, isCustomerExist, updateCustomer, getCustomerById, getAllCustomers, deleteCustomer
}
module.exports = customerService