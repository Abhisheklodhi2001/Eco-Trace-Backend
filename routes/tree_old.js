const express = require("express");
const treeController = require("../controller/treeController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/allTreedata",treeController.allTreedata);

router.post("/addMainTree", treeController.addMainTree);

router.post("/addRoot", treeController.addRoot);

router.post("/addChildInTree", treeController.addChildInTree);

router.post("/getNodedeailById", treeController.getNodedeailById);

router.get("/getTreeMembers/:family_id", treeController.getFamilyMembers);

router.post("/deleteNode", treeController.deleteNode);

router.post("/deleteTree", treeController.deleteTree);

router.post("/UpdateChildInTree", treeController.UpdateChildInTree);

router.get("/getAllFamilyMembers/", treeController.getAllFamilyMembers);
// /
module.exports = router;