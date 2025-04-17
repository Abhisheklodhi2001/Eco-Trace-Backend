const express = require("express");
const scope2Controller = require("../controller/scope2Controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload_file");
const router = express.Router();

router.post("/Addelectricity", auth, upload.single('file'), scope2Controller.Addelectricity);

router.post("/getAllelectricity", auth, scope2Controller.getAllelectricity);

router.post("/Addrenewableelectricity", auth, scope2Controller.Addrenewableelectricity);

router.post("/getrenewableelectricity", auth, scope2Controller.getrenewableelectricity);

router.post("/Addheatandsteam", auth, scope2Controller.Addheatandsteam);

router.post("/getAllheatandsteam", auth, scope2Controller.getAllheatandsteam);

router.get("/getAllRegions", scope2Controller.getAllRegions)
//
module.exports = router;











