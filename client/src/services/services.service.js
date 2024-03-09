const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";

const getServices = async () => {
    const res = await axios.get(`${api_url}/services`);
    return res.data.data;
};

const addService = async (formData) => {
    const res = await axios.post(`${api_url}/service`, formData);
    return res;
}

const deleteService = async (id) => {
    const res = await axios.delete(`${api_url}/service/${id}`);
    return res;
}

const getServiceById = async (service_id) => {
    const res = await axios.get(`${api_url}/service/${service_id}`);
    return res;
}

const editService = async (formData) => {
    const res = await axios.put(`${api_url}/service/${formData.service_id}`, formData);
    return res;
}

const serviceService = {
    getServices,
    addService,
    deleteService,
    getServiceById,
    editService
};

export default serviceService