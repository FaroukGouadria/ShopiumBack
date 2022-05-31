const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check ("name")
    .trim()
    .not()
    .isEmpty ()
   .withMessage ("Name is missing!")
    .isLength({ min: 3, max: 20 })
   .withMessage ("Name must be 3 to 20 characters long!"),
    check('email').normalizeEmail().isEmail().withMessage('Email isinvalid!'),
    check ('password').trim()
    .not()
    .isEmpty()
   .withMessage ("Password is missing!").isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];


exports.validate= (req,res,next)=>{
    const error=validationResult(req).array()
    if(!error.isLength) return next()
    res.status(400).json({success:false,error:error[0].msg})
}