const express = require("express");
const stationaryCombController = require("../controller/stationaryCombController");
const auth = require("../middleware/auth");
const router = express.Router();


router.get("/getSubCatSeedData", stationaryCombController.getSubCatSeedData);
router.get("/getSubCategoryTypes", stationaryCombController.getSubCategoryTypes);
router.post("/stationaryCombustionEmission", auth, stationaryCombController.stationaryCombustionEmission);
router.get("/getStationaryCombEmission", auth, stationaryCombController.getStationaryCombEmission);
router.post("/getStationaryCombEmissionByTypeId", auth, stationaryCombController.getStationaryCombEmissionByTypeId);

module.exports = router;