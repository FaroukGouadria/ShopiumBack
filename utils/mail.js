const nodemailer = require('nodemailer');
exports.generateOTP=()=> {
    let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randVal = Math.round(Math.random() * 9);
    otp += randVal;
  }
  return otp;
}
exports.transporter = nodemailer.createTransport({
   service: "gmail", 
      host: "smtp.ethereal.email", 
      port: 587, 
      secure: false, // true for 465, false for other ports
      auth: {
        user: "appshopium@gmail.com", // generated ethereal user
        pass: "tusxufzefsdsheyq" // generated ethereal password
      }
  });
