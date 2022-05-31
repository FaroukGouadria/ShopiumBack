const jwt = require('jsonwebtoken');
const User = require('../model/user');
exports.isAuth =async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split('')[1]
        const decode = jwt.verify(token,process.env.JWT_SECURE);
        const user = await User.findById(decode.userId);
        if(!user) {
            return res.json({success: false, message: 'user not found! '})
        }
        req.user= user ;
        next();
    }else{
        res.json({success: false, message: 'unauthorized access verif ! '})
    }
};

exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token);
        const decoded =  jwt.verify(token, process.env.JWT_SECURE)
        const user =  User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

