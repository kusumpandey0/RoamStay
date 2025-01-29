const Property = require("../models/Property");

const createproperty = async (req, res) => {
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
    const roomimagePathsArray = roomimagePaths.images.map((file) => file.path);
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
};

//fetch approved Property
const readproperty = async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find({status:"approved"});

    // If no properties are found
    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found." });
    }

    // Send back the list of properties
    res.status(200).json({
      message: "Properties retrieved successfully!",
      properties,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve properties", error: err.message });
  }
};

//fetch pending Property
const fetchPendingproperty = async (req, res) => {
  try {
    // Fetch all properties from the database
    const properties = await Property.find({status:"pending"});

    // If no properties are found
    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found." });
    }

    // Send back the list of properties
    res.status(200).json({
      message: "Properties retrieved successfully!",
      properties,
    });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Failed to retrieve properties", error: err.message });
  }
};

//fetch single property

const fetchSingleProperty = async (req, res) => {
  const { id } = req.params;

  try {
      const singleProperty = await Property.findById(id);
      
      if (!singleProperty) {
          return res.status(404).json({
              message: "Property not found"
          });
      }

      res.status(200).json({
          message: "Single property fetched",
          data: singleProperty
      });

  } catch (err) {
      res.status(500).json({
          message: "Unable to fetch property",
          error: err.message
      });
  }
};


//update status of Property

const updatePropertyStatus=async(req,res)=>{
  const {id}=req.params;
  const{status}=req.body;

try{
    const property=await Property.findByIdAndUpdate(id,{status});

    if(!property){
      return res.status(404).json({
        error:"Property not Found",
      }
      )
    }

    res.status(200).json({
      message:"Property approved Successfully",
      data:property
    })

}catch(err){
  res.status(500).json({
    message:"Unable to update guide"
  })
}
}



module.exports = { createproperty, readproperty,fetchPendingproperty,updatePropertyStatus,fetchSingleProperty };
