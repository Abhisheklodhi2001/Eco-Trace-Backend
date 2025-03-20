const express = require("express");
const auth = require("../middleware/auth");

const ghgEmissionReportController = require("../controller/ghgEmissionReportController");
const router = express.Router();

router.post("/GhgScopewiseEmssion", auth, ghgEmissionReportController.GhgScopewiseEmssion);
router.post('/GhgdashboardWasteTotal', auth, ghgEmissionReportController.GhgdashboardWasteTotal);
router.get("/top-combustion-emissions", ghgEmissionReportController.getTopCombustionEmission);
router.get("/emissions", ghgEmissionReportController.fetchEmissionData);
router.get("/get-waste-data", ghgEmissionReportController.getWasteEmissionData);


module.exports = router;