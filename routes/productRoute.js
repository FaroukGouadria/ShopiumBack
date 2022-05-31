const router = require("express").Router();
const productCtrl = require("../controller/product");
const multer = require('multer');
const path = require('path');
const bodyParser = require("body-parser");
const { addProduct } = require("../controller/product");
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../images/product'),function(err,success){
            if(err){
                throw err;
            }
        })
    },
    filename:function(req,file,cb){
        const name=Date.now()+'-'+file.originalname;
        cb(null,name,function(err,success){
            if(err){
                throw err;
            }
        });

    }
});

const upload = multer({storage:storage});
router.route("/").get(productCtrl.getProducts).post(productCtrl.createProduct);

router.route("/:id").delete(productCtrl.deleteProduct).put(productCtrl.updateProduct);


router.post('/add',upload.array('photo'),addProduct);
module.exports = router;
