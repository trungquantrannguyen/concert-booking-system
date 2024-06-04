import Artist from "../models/artist.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllArtist = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const artists = await Artist.find({
      name: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

export const selectArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return next(errorHandler(404, "Concert not found"));
    }
    res.status(200).json(artist);
  } catch (error) {
    next(error);
  }
};

export const createArtist = async (req, res, next) => {
  //   console.log(req.params.id);
  //   console.log(process.env.ADMIN1ID);
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json({
      message: "Created successfully",
      artist,
    });
  } catch (error) {
    next(error);
  }
};

export const updateArtist = async (req, res, next) => {
  const artist = await Artist.findById(req.params.artistID);
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  if (!artist) {
    return next(errorHandler(404, "Artist not found"));
  }
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.artistID,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Artist has been updated", updatedArtist });
  } catch (error) {
    next(error);
  }
};

export const deleteArtist = async (req, res, next) => {
  const artist = await Artist.findById(req.params.artistID);

  if (!artist) {
    return next(errorHandler(404, "Artist not found"));
  }
  try {
    await Artist.findByIdAndDelete(artist);
    res.status(200).json("Artist has been deleted");
  } catch (error) {
    next(error);
  }
};
