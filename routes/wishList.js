const routerWishList = require("express").Router();
const bodyParser = require("body-parser");
const { addToWishlist, removeFromWishlist, getwishlist } = require("../controller/wishList");

const User = require("../model/user");
routerWishList.use(bodyParser.json());
routerWishList.use(bodyParser.urlencoded({extended: false}));


// wishlist
routerWishList.post("/add", addToWishlist);
routerWishList.post("/getWishlist", getwishlist);
routerWishList.delete("/delete", removeFromWishlist);
module.exports = routerWishList;