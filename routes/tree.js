const express = require("express");
const treeController = require("../controller/treeController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/allTreedata", treeController.allTreedata);

router.post("/addMainTree", auth, treeController.addMainTree);

router.post("/addRoot", treeController.addRoot);

router.post("/addChildInTree", auth, treeController.addChildInTree);

router.post("/getNodedeailById", treeController.getNodedeailById);

router.get("/getTreeMembers/:family_id", treeController.getFamilyMembers);

router.post("/deleteNode", auth, treeController.deleteNode);

router.post("/deleteTree", treeController.deleteTree);

router.post("/UpdateChildInTree", auth, treeController.UpdateChildInTree);

router.get("/getAllFamilyMembers/:tenant_id", treeController.getAllFamilyMembers);

router.post("/createaddMainTree", auth, treeController.createaddMainTree);

router.post("/allTreedata_new", treeController.allTreedata_new);

router.post("/deleteFamilyMember", treeController.deleteFamilyMember);
// /
module.exports = router;