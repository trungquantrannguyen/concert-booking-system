import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    capacity: {
      type: Number,
      require: true,
    },
    seatClass: {
      type: Map,
      of: Number,
      require: true,
    },
    priceRange: {
      type: Map,
      of: Number,
      require: true,
    },
    imgURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
