import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    genre: {
      type: String,
      require: true,
    },
    imgURL: {
      type: String,
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
