const router = require("express").Router();
const bodyParser = require("body-parser");
const { add, getRibByUser } = require("../controller/rib");
const User = require("../model/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


router.post('/add',add);
router.post('/ribbyuser',getRibByUser);

module.exports = router;