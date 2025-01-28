const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/roomphotos");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// const upload = multer({ storage: storage }).array("images", 10);
const upload = multer({ storage: storage }).fields([
  {name:"images",maxCount:5},
  {name:"photo",maxCount:1},
  {name:"certificate",maxCount:1},
  {name:"citizenship",maxCount:2}
]);

module.exports = { upload, storage };
