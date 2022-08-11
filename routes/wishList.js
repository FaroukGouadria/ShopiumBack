const routerWishList = require("express").Router();
const bodyParser = require("body-parser");
const { addToWishlist, wishlist, removeFromWishlist } = require("../controller/auth");
const User = require("../model/user");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


// wishlist
router.post("/add", addToWishlist);
router.post("/getWishlist", wishlist);
router.put("/delete", removeFromWishlist);
module.exports = routerWishList;