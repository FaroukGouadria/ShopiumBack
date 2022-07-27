const router = require("express").Router();
const bodyParser = require("body-parser");
const { add, getProductByFabricant } = require("../controller/fabricant");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post("/add",add);
router.get("/getproductByFab",getProductByFabricant);

module.exports = router;