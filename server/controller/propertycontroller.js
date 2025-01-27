const Property = require("../models/Property");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "public/roomphotos");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).array("images", 10);
const propertycontroller = async (req, res) => {
  if (req.method === "POST") {
    try {
      const roomimagePaths = req.files;
      const {
        title,
        description,
        highlight,
        highlightDesc,
        price,
        availableDates,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        categoryLists,
        typeLists,
        amenitiesLists,
        location,
        address,
      } = req.body;
      const roomimagePathsArray = roomimagePaths.map((file) => file.path);
      const parsedLocation = JSON.parse(location);

      const newProperty = new Property({
        title,
        description,
        highlight,
        highlightDesc,
        price,
        availableDates: JSON.parse(availableDates), // Assuming it's a JSON string of dates
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        categoryLists: JSON.parse(categoryLists), // Parse the category lists as arrays
        typeLists: JSON.parse(typeLists), // Parse the type lists as arrays
        amenitiesLists: JSON.parse(amenitiesLists),
        location: [parsedLocation.lng, parsedLocation.lat], // Store location with coordinates
        address,
        images: roomimagePathsArray, // Store the image paths
      });
      await newProperty.save();
      res.status(200).json({
        message: "property registered successfully!",
        property: newProperty,
      });
    } catch (err) {
      console.log(err.message);
      res
        .status(500)
        .json({ message: "registration failed!", error: err.message });
    }
  } else if (req.method === "GET") {
    const properties = await Property.find();
    console.log("ppp", properties);
  }
};
module.exports = { propertycontroller, upload };
