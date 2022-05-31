const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopmuim',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
}).then(()=>console.log('db is connected')).catch((err)=>{console.log(err)})

// mongoose.connect('mongodb+srv://farouk:Frouga1@pfe.di1sy.mongodb.net/pfe',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     // useCreateIndex:true,
// }).then(()=>console.log('db is connected')).catch((err)=>{console.log(err)});


