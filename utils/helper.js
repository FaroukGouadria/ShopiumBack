const crypto = require("crypto");
exports.sendError = (res, error, status = 401) => {
  res.status(status).json({success: false, error});
};

exports.createRandomBytes = (token) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) 
        console.log(error)
      token = buff.toString("hex");
      console.log("random token created successfully" + token);
      return token;    
    });
};
