const serviceService = require("../services/services.service");


const createService = async (req, res) => {
    const { service_name, service_description } = req.body;
 try {
       const service = {
         service_name,
         service_description,
       };
       const newService = await serviceService.createService(service);
       if (!newService) {
         return res
           .status(500)
           .json({ success: false, message: "failed to create new service" });
       } else {
         return res
           .status(201)
           .json({
             success: true,
             message: "Service has been created successfully",
           });
       }
 } catch (error) {
     console.log(error);
     res.status(500).json(error);
 }
};

const getAllServices = async (req, res) => {
  const services = await serviceService.getAllServices();
  if (!services) {
    return res. status(500).json({
      success: false,
      message: "failed to get all services"
    })
  }
  else{
    return res.status(200).json({
      success: true,
      data: services
    })
  }
}

const deleteService = async (req, res) => {
  const service = await serviceService.deleteService(
    req.params.service_id
  )
  if (!service) {
    return res. status(500).json({
      success: false,
      message: "failed to delete service"
    })
  }
  else{
    return res.status(200).json({
      success: true,
      message: "Service has been deleted successfully"
    })
  }
}

const updateService = async (req, res) => {
 try {
   const service = await serviceService.updateService(
     req.params.service_id,
     req.body
   );
   if (!service) {
     return res.status(500).json({
       success: false,
       message: "failed to update service",
     });
   } else {
     return res.status(200).json({
       success: true,
       message: "Service has been updated successfully",
     });
   }
 } catch (error) {
   console.log(error);
   res.status(500).json(error);
 }
}

const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.service_id);
    if (!service) {
      return res.status(500).json({
        success: false,
        message: "failed to get service",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: service,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const servicesController = {
  createService,
  getAllServices,
  deleteService,
  updateService,
  getServiceById
}

module.exports = servicesController