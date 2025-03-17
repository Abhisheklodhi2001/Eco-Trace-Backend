const express = require("express");
const scope1Controller = require("../controller/scope1Controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/GetSubCategoryTypes/:id", auth, scope1Controller.GetSubCategoryTypes);
router.get("/Getfacilities", auth, scope1Controller.Getfacilities);
router.get("/GetScope", auth, scope1Controller.GetScope);
router.get("/GetAllcategoryByScope", scope1Controller.GetAllcategoryByScope);
router.get("/getAssignedDataPointbyfacility/:facilityId", scope1Controller.getAssignedDataPointbyfacility);
router.get("/GetUnits/:id", scope1Controller.GetUnits);
router.get("/getBlendType", scope1Controller.getBlendType);
router.get("/getmanageDataPointbyfacility/:facilityId/:ScopeID", scope1Controller.getmanageDataPointbyfacility);
router.post("/AddassignedDataPointbyfacility", scope1Controller.AddassignedDataPointbyfacility);
router.post("/AddstationarycombustionLiquid", scope1Controller.AddstationarycombustionLiquid);
router.post("/Addrefrigerant", scope1Controller.Addrefrigerant);
router.get("/Allrefrigerant", scope1Controller.Allrefrigerant);
router.get("/getrefrigents/:SubCategorySeedID", scope1Controller.getrefrigents);
router.get("/Getfireextinguisher", scope1Controller.Getfireextinguisher);
router.post("/Addfireextinguisher", scope1Controller.Addfireextinguisher);
router.get("/Getpassengervehicletypes", scope1Controller.Getpassengervehicletypes);
router.get("/Getdeliveryvehicletypes", scope1Controller.Getdeliveryvehicletypes);
router.post("/Addcompanyownedvehicles", scope1Controller.Addcompanyownedvehicles);
router.post("/add-multiple-company-owned-vehicles", scope1Controller.addMultipleCompanyOwnedVehicles);
router.post("/getAllcompanyownedvehicles", scope1Controller.getAllcompanyownedvehicles);
router.get("/getAllcategoryByfacility/:id", scope1Controller.getAllcategoryByfacility);
router.post("/electricitygridType", scope1Controller.electricitygridType);

module.exports = router;











