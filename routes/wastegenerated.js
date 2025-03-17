
const express = require("express");
const wasteGeneratedController = require("../controller/wasteGeneratedController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/wasteGeneratedEmission", auth, wasteGeneratedController.wasteGeneratedEmission);
router.get("/getwasteGeneratedEmission", auth, wasteGeneratedController.getwasteGeneratedEmission);
router.post("/getDataProgress", wasteGeneratedController.getDataProgress);
router.post("/getDataProgressForFacilities", wasteGeneratedController.getDataProgressForFacilities);

module.exports = router;