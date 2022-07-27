const router = require("express").Router();
const offerCtrl = require("../controller/offre");
const offresModel = require("../model/offresModel");

router.post('/add',offerCtrl.createOffer);
router.get('/productbyoffer',offerCtrl.getProductByOffer);
router.delete('/delete',offerCtrl.deleteOffre);
router.post('/getall',offerCtrl.getOffers);

        
module.exports = router;
