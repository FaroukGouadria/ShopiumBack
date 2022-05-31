const router = require("express").Router();
const offerCtrl = require("../controller/offre");

router.route('/')
        .post(offerCtrl.createOffer)


        
module.exports = router;
