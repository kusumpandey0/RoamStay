const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    highlight: String,
    highlightDesc: String,
    price: Number,
    availableDates: [Date],
    guestCount: Number,
    bedroomCount: Number,
    bedCount: Number,
    bathroomCount: Number,
    categoryLists: [{ id: String, name: String, icon: Object }],
    typeLists: [{ name: String, description: String, icon: Object }], // Make sure typeLists is defined as an array of objects
    amenitiesLists: [{ name: String, icon: Object }],
    location: {
      type: [Number],
      required: true,
    },
    address: String,
    images: [String],
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
