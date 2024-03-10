const customerService = require("../services/customer.service");
const randomstring = require("randomstring");

const createCustomer = async (req, res) => {
  const customer_hash = randomstring.generate(10);
  const customerExist = await customerService.isCustomerExist(
    req.body.customer_email
  );

  if (customerExist.length > 0) {
    return res
      .status(403)
      .json({
        success: false,
        error: "Customer with this email already exist",
      });
  }

  try {
    const customer = await customerService.createCustomer(
      req.body,
      customer_hash
    );
    if (!customer) {
      return res
        .status(500)
        .json({ success: false, message: "failed to create new customer" });
    } else {
      return res.status(201).json({
        success: true,
        message: "Customer has been created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// update customer controller
const updateCustomer = async (req, res) => {
  const customer = await customerService.updateCustomer(
    req.params.customer_id,
    req.body
  );
  if (!customer) {
    return res
      .status(500)
      .json({ success: false, message: "failed to update customer" });
  } else {
    return res
      .status(200)
      .json({
        success: true,
        message: "Customer has been updated successfully",
      });
  }
};

const getCustomerById = async (req, res) => {
  const customer = await customerService.getCustomerById(
    req.params.customer_id
  );
  if (!customer) {
    return res.status(500).json({
      success: false,
    });
  } else {
    return res.status(200).json({
      success: true,
      data: customer,
    });
  }
};

const getAllCustomers = async (req, res) => {
  const customers = await customerService.getAllCustomers();
  if (!customers) {
    return res.status(500).json({
      success: false,
      message: "failed to get all customers",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: customers,
    });
  }
};

const deleteCustomer = async (req, res) => {
  const customer = await customerService.deleteCustomer(req.params.customer_id);
  if (!customer) {
    return res.status(500).json({
      success: false,
      message: "failed to delete customer",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Customer has been deleted successfully",
    });
  }
};

const searchCustomer = async (req, res) => {
  const customers = await customerService.searchCustomer(req.params.q);

  if (!customers) {
    return res.status(500).json({
      success: false,
      message: "failed to search customer",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: customers,
    });
  }
};
const customerController = {
  createCustomer,
  updateCustomer,
  getCustomerById,
  getAllCustomers,
  deleteCustomer,
  searchCustomer,
};
module.exports = customerController;
