const FideliteContoller = require("../controller/Fidelite");

const FideliteRouter = require("express").Router();


FideliteRouter.post('/add', FideliteContoller.addFidelite);
FideliteRouter.get('/all',FideliteContoller.getCart);
FideliteRouter.post("/getByUserId", FideliteContoller.getCartById);
module.exports = FideliteRouter;
