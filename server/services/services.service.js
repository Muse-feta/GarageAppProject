const pool = require("../config/db.config");


const createService = async (service) => {
    const query = `INSERT INTO common_services (service_name, service_description) VALUES (?, ?)`;
    const rows = await pool.query(query, [service.service_name, service.service_description]);
    return rows[0];
};

const getAllServices = async () => {
    const query = `SELECT * FROM common_services`;
    const rows = await pool.query(query);
    return rows[0];
}

const deleteService = async (service_id) => {
    const query = `DELETE FROM common_services WHERE service_id = ?`;
    const rows = await pool.query(query, [service_id]);
    return rows[0];
}

const updateService = async (service_id, service) => {
    const query = `UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?`;
    const rows = await pool.query(query, [service.service_name, service.service_description, service_id]);
    return rows[0];
}

const getServiceById = async (service_id) => {
    const query = `SELECT * FROM common_services WHERE service_id = ?`;
    const rows = await pool.query(query, [service_id]);
    return rows[0];
}

const serviceService = {
    createService,
    getAllServices,
    deleteService,
    updateService,
    getServiceById
};

module.exports = serviceService