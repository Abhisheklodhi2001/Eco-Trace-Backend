const express = require("express");
const scope1Controller = require("../controller/scope1Controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/GetSubCategoryTypes/:id", auth, scope1Controller.GetSubCategoryTypes);
router.get("/Getfacilities", auth, scope1Controller.Getfacilities);
router.get("/GetScope", auth, scope1Controller.GetScope);
router.get("/GetAllcategoryByScope", auth,scope1Controller.GetAllcategoryByScope);
router.get("/getAssignedDataPointbyfacility/:facilityId",auth, scope1Controller.getAssignedDataPointbyfacility);
router.get("/GetUnits/:id", auth,scope1Controller.GetUnits);
router.get("/getBlendType", auth,scope1Controller.getBlendType);
router.get("/getmanageDataPointbyfacility/:facilityId/:ScopeID",auth, scope1Controller.getmanageDataPointbyfacility);
router.post("/AddassignedDataPointbyfacility", auth,scope1Controller.AddassignedDataPointbyfacility);
router.post("/AddstationarycombustionLiquid", auth,scope1Controller.AddstationarycombustionLiquid);
router.post("/Addrefrigerant", auth,scope1Controller.Addrefrigerant);
router.get("/Allrefrigerant", auth,scope1Controller.Allrefrigerant);
router.get("/getrefrigents/:SubCategorySeedID", auth,scope1Controller.getrefrigents);
router.get("/Getfireextinguisher", auth,scope1Controller.Getfireextinguisher);
router.post("/Addfireextinguisher", auth,scope1Controller.Addfireextinguisher);
router.get("/Getpassengervehicletypes", auth,scope1Controller.Getpassengervehicletypes);
router.get("/Getdeliveryvehicletypes", auth,scope1Controller.Getdeliveryvehicletypes);
router.post("/Addcompanyownedvehicles",auth, scope1Controller.Addcompanyownedvehicles);
router.post("/add-multiple-company-owned-vehicles", scope1Controller.addMultipleCompanyOwnedVehicles);
router.post("/getAllcompanyownedvehicles", scope1Controller.getAllcompanyownedvehicles);
router.get("/getAllcategoryByfacility/:id", scope1Controller.getAllcategoryByfacility);
router.post("/electricitygridType", scope1Controller.electricitygridType);

module.exports = router;











