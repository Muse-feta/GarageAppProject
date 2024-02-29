const router = require('express').Router();
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');
const vehicleController = require('../controller/vehicle.controller');

router.post(
    "/api/vehicle",
    [verifyToken, isAdmin],
    vehicleController.createVehicle
);

router.get("/api/vehicles/:customer_id", vehicleController.getVehiclesByCustomerId);

module.exports = router;
