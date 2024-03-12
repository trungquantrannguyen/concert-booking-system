import mongoose from "mongoose";

const concertSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
    },
  },
  { timestamps: true }
);

const Concert = mongoose.model("Concert", concertSchema);

export default Concert;
