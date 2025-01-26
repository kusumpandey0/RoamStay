const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  highlight: {
    type: String,
    default: "",
  },
  highlightDesc: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  amenitiesLists: [
    {
      name: String,
      icon: String,
    },
  ],
  categoryLists: [
    {
      name: String,
      icon: String,
    },
  ],
  typeLists: [
    {
      name: String,
      description: String,
    },
  ],
  availableDates: {
    type: [Date], // Start and end dates
    validate: {
      validator: function (dates) {
        return dates.length === 2; // Ensure there are two dates
      },
      message: "Available dates must include a start and end date.",
    },
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
    min: 1,
  },
  bedroomCount: {
    type: Number,
    required: true,
    min: 1,
  },
  bedCount: {
    type: Number,
    required: true,
    min: 1,
  },
  bathroomCount: {
    type: Number,
    required: true,
    min: 1,
  },
  photos: [
    {
      type: String, // URLs or paths to uploaded photos
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PropertySchema.index({ location: "2dsphere" }); // Geospatial index for location

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
