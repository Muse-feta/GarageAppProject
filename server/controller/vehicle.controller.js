const vehicleService = require("../services/vehicle.service");

const createVehicle = async (req, res) => {
    const vehicleExist = await vehicleService.isVehicleExist(
      req.body.vehicle_serial
    );
    if(vehicleExist.length > 0) {
        return res
          .status(403)
          .json({
            success: false,
            error: "Vehicle with this vehicle_serial already exist",
          });
    }
    
    try {
        const vehicleData = req.body
        const vehicle =  await vehicleService.createVehicle(vehicleData)
        if(!vehicle){
            return res.status(500).send('failed to create new vehicle')
        }else{
            return res.status(201).json({success: true, message: 'Vehicle has been created successfully'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const getVehiclesByCustomerId = async (req, res) => {
    const vehicles = await vehicleService.getVehiclesByCustomerId(
      req.params.customer_id
    );
    if (!vehicles) {
      return res. status(500).json({
        success: false, message: "failed to get vehicles"
      })
    }else{
      return res.status(200).json({
        success: true, data: vehicles
      })
    }
    
}

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await vehicleService.getVehicleById(req.params.vehicle_id)
        if (!vehicle) {
            return res.status(500).json({
                success: false,
                message: "failed to get vehicle",
            })
        }
        else{
            return res.status(200).json({
                success: true,
                data: vehicle
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const vehicleController = {
    createVehicle,
    getVehiclesByCustomerId,
    getVehicleById
}

module.exports = vehicleController;