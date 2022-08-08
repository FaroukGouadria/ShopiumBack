const routerFavorite = require("express").Router();
const bodyParser = require("body-parser");
const FavoriteCtrl =require ('../controller/favorite');
// routerFavorite.use(bodyParser.json());
// routerFavorite.use(bodyParser.urlencoded({extended: false}));


routerFavorite.post('/add',FavoriteCtrl.addFavorite);

module.exports = routerFavorite;