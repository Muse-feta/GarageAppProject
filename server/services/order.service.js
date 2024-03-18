const pool = require("../config/db.config");
const randomString = require("randomstring");

const createOrder = async (data) => {
    // console.log(data)
    // const createdOrder = {};
    try {
        const order_hash = randomString.generate(30);
        const query = `INSERT INTO orders (employee_id, customer_id, vehicle_id,  active_order, order_hash) VALUES (?, ?, ?, ?, ?)`;
        const rows = await pool.query(query, [
            data.employee_id,
            data.customer_id,
            data.vehicle_id,
            data.active_order,
            order_hash
        ]);   

        const order_id = rows[0].insertId;

        if (rows[0].affectedRows !== 1) {
            return false;
        }

        const query2 = `INSERT INTO order_status (order_id,  order_status) VALUES (?, ?)`;
        const rows2 = await pool.query(query2, [order_id, data.order_status]);

      const query3 =
        "INSERT INTO order_services (order_id, service_id, service_completed) VALUES (?, ?, ?)";
      for (const service of data.order_services) {
        const rows3 = await pool.query(query3, [
          order_id,
          service.service_id,
          service.service_completed,
        ]);
      }

        const query4 = `INSERT INTO order_info (order_id, order_total_price, additional_request, additional_requests_completed) VALUES (?, ?, ?, ?)`;
        const rows4 = await pool.query(query4, [
          order_id,
          data.order_total_price,
          data.additional_request,
          data.additional_requests_completed
        ]);
        return rows4;
    } catch (error) {
        console.log(error);
       }
    }

const getAllOrders = async () => {
    try {
        const query = `SELECT * FROM orders INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN order_info ON orders.order_id = order_info.order_id`;
        const rows = await pool.query(query);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

const singleOrder = async (order_id) => {
    try {
        const query = `SELECT * FROM orders INNER JOIN order_status ON orders.order_id = order_status.order_id INNER JOIN order_info ON orders.order_id = order_info.order_id INNER JOIN order_services ON orders.order_id = order_services.order_id WHERE orders.order_id = ?`;
        const rows = await pool.query(query, [order_id]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}


    const order_service = { createOrder, getAllOrders, singleOrder };

    module.exports = order_service