import Concert from "../models/conert.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllConcerts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "time";
    const order = req.query.order || "desc";

    const concerts = await Concert.find({
      name: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(concerts);
  } catch (error) {
    next(error);
  }
};

export const createConcert = async (req, res, next) => {
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  const { name, artist, date, time, venue } = req.body;
  const formatDate = new Date(date);
  const newConcert = { name, artist, formatDate, time, venue };
  try {
    const concert = await Concert.create(newConcert);
    res.status(201).json({
      message: "Created successfully",
      concert,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteConcert = async (req, res, next) => {
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  const concert = await Concert.findById(req.params.concertID);

  if (!concert) {
    return next(errorHandler(404, "Concert not found"));
  }
  try {
    await Concert.findByIdAndDelete(req.params.concertID);
    res.status(200).json("Concert has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateConcert = async (req, res, next) => {
  const concert = await Concert.findById(req.params.concertID);
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  if (!concert) {
    return next(errorHandler(404, "Concert not found"));
  }
  try {
    const newConcert = await Concert.findByIdAndUpdate(
      req.params.concertID,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Concert has been updated", newConcert });
  } catch (error) {
    next(error);
  }
};

export const selectConcert = async (req, res, next) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return next(errorHandler(404, "Concert not found"));
    }
    res.status(200).json(concert);
  } catch (error) {
    next(error);
  }
};
