const api_url = import.meta.env.VITE_API_URL;
import axios from "axios";

const createCustomer = async (formData, customerToken) => {
    const res = await axios.post(`${api_url}/customer`, formData, {
      headers: {
        "x-access-token": customerToken,
      },
    });

    return res;

};

const getCustomerById = async (customer_id, employeeToken) => {
  const res = await axios.get(`${api_url}/customer/${customer_id}`, {
    headers: {
      "x-access-token": employeeToken,
    },
  });
  return res;
};

const getAllCustomers = async (customerToken) => {
  const res = await axios.get(`${api_url}/customers`, {
    headers: {
      "x-access-token": customerToken,
    }
  })
  return res
}

const updateCustomer = async (customer_id, formData, customerToken) => {
  const res = await axios.put(
    `${api_url}/customer/${customer_id}`,
    formData,
    {
      headers: {
        "x-access-token": customerToken,
      },
    }
  );
  return res
}

const customerService = {
    createCustomer,
    getCustomerById,
    getAllCustomers,
    updateCustomer
}

export default customerService
