const User = require('../model/user');

module.exports =  async function (req,res,next){
    try {
        const user = await User.findOne({
            _id:req.user._id
        })
        if(user.role ==='subscriber'){
            return res.status(403).json({
                error:'Admin resources access denied'
            })
        }
        next();
    } catch (error) {
            console.log(err);
            res.status(500).send("Server Error");
    }
}