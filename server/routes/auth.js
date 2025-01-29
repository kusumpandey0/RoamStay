const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");
/*configuration multer for the file upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/*USER REGISTER */
router.post("/signup", upload.single("profileimage"), async (req, res) => {
  try {
    /*take all information from the form */
    const { firstname, lastname, email, phonenumber, password } = req.body;
    console.log(req.body);
    let profileimagePath = "";
    if (req.file) {
      profileimagePath = req.file.path;
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists!", role: existingUser.role });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashPassword,
      profileimagePath,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "user registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "registration failed!", error: err.message });
  }
});

/*user login */
router.post("/login", async (req, res) => {
  try {
    /*take info from the form */
    const { email, password } = req.body;
    /*check is user exists */
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) return res.status(400).json({ message: "User doesn't exist!" });
    /*checking the password with the hash password*/
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });
    /*generate JWT token */
    const token = jwt.sign(
      { id: user._id, firstname: user.firstname, role: user.role },
      process.env.JWT_SECRET
    );
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
