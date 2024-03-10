const router = require('express').Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const vehicleController = require('../controller/vehicle.controller');

router.post(
    "/api/vehicle",
    [verifyToken, isAdmin],
    vehicleController.createVehicle
);

router.get("/api/vehicles/:customer_id", vehicleController.getVehiclesByCustomerId);

router.get(
    "/api/vehicle/:vehicle_id",
    // [verifyToken, isAdmin],
    vehicleController.getVehicleById
);

module.exports = router;
