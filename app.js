const express = require('express');
require('dotenv').config({
    path:'./index.env',
});
require('./db')
const multer = require('multer');
const app =  express();
const cors = require('cors');
const userRouter = require('./routes/user')
const categoryRouter = require('./routes/categoryRoute');
const ProductRouter = require("./routes/productRoute");
const OfferRouter = require("./routes/offreRouter");
const subCategory_route = require('./routes/subCategory');
const bodyParser = require('body-parser');
const FideliteRouter = require('./routes/fideliteRouter');
const RibRouter = require('./routes/rib');
const CompanyRouter = require("./routes/fabricant");
const reviewsRouter = require('./routes/reviews');
const RouterTicket = require('./routes/ticket');
const routerFavorite = require('./routes/favorite');
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/user',userRouter)
app.use('/api/category',categoryRouter)
app.use("/api/products", ProductRouter);
app.use("/api/offer", OfferRouter);
app.use("/sub", subCategory_route);
app.use("/cart",FideliteRouter );
app.use("/rib",RibRouter);
app.use("/company",CompanyRouter);
app.use('/reviews',reviewsRouter)
app.use('/ticket',RouterTicket)
app.use('/favorite',routerFavorite);
const PORT =process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
});