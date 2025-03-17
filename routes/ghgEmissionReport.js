const express = require("express");
const auth = require("../middleware/auth");

const ghgEmissionReportController = require("../controller/ghgEmissionReportController");
const router = express.Router();

router.post("/GhgScopewiseEmssion", auth, ghgEmissionReportController.GhgScopewiseEmssion);
router.post('/GhgdashboardWasteTotal', auth, ghgEmissionReportController.GhgdashboardWasteTotal);

module.exports = router;