const express = require('express');
const subCategory_route = express();

const bodyParser = require('body-parser');
const { createSubCategory } = require('../controller/sub');
subCategory_route.use(bodyParser.json());
subCategory_route.use(bodyParser.urlencoded({extended:true}));

subCategory_route.post('/add_sub',createSubCategory)

module.exports=subCategory_route;