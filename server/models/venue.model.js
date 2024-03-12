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
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", userSchema);

export default Venue;
