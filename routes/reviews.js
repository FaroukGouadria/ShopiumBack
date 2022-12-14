const router = require("express").Router();
const bodyParser = require("body-parser");
const { ajouterCommentaire, toutCommentaires, getCommentaireByProduct, countReviews } = require("../controller/reviews");
const reviews = require("../model/reviews");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('/add',ajouterCommentaire);
router.get("/getall",toutCommentaires);
router.post('/reviewByproduct',getCommentaireByProduct);
router.post('/countReviews',countReviews);
module.exports=router;