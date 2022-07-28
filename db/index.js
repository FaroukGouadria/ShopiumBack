const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/shopmuim',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     // useCreateIndex:true,
// }).then(()=>console.log('db is connected')).catch((err)=>{console.log(err)})

mongoose.connect(process.env.DATA_BASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(()=>console.log('db is connected successfully')).catch((err)=>{console.log(err)});


