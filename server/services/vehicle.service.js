const pool = require("../config/db.config");

const isVehicleExist = async (vehicle_serial) => {
  const query = `SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?`;
  const rows = await pool.query(query, [vehicle_serial]);
  return rows[0];
};

const createVehicle = async (data) => {
  try {
    const query = `INSERT INTO customer_vehicle_info (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type,vehicle_mileage,vehicle_tag,vehicle_serial,vehicle_color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const rows = await pool.query(query, [
      data.customer_id,
      data.vehicle_year,
      data.vehicle_make,
      data.vehicle_model,
      data.vehicle_type,
      data.vehicle_mileage,
      data.vehicle_tag,
      data.vehicle_serial,
      data.vehicle_color,
    ]);

    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const getVehiclesByCustomerId = async (customer_id) => {
  const query = `SELECT * FROM customer_vehicle_info WHERE customer_id = ?`;
  const rows = await pool.query(query, [customer_id]);
  return rows[0];
}

const vehicleService = {
  isVehicleExist,
  createVehicle,
  getVehiclesByCustomerId
};
module.exports = vehicleService;
