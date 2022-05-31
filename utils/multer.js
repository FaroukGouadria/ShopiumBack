const multer = require("multer");
const path = require("path");


module.exports = multer({
  storage: multer.diskStorage({destination:'images/user'}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, file.fieldname);
  }
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/images/user");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname);
//   }
// });

// const uploade = multer({storage: storage});
// module.exports = uploade;