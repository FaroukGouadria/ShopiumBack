const routerWishList = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../model/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));



module.exports = routerWishList;