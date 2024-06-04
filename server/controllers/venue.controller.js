import Venue from "../models/venue.model.js";

export const getAllVenues = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const venues = await Venue.find({
      venueName: { $regex: searchTerm, $options: "i" },
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
};

export const createVenue = async (req, res, next) => {
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json({
      message: "Created successfully",
      venue,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVenue = async (req, res, next) => {
  const venue = await Venue.findById(req.params.VenueID);

  if (!venue) {
    return next(errorHandler(404, "Venue not found"));
  }
  try {
    await Venue.findByIdAndDelete(venue);
    res.status(200).json("Venue has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateVenue = async (req, res, next) => {
  const venue = await Venue.findById(req.params.VenueID);
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID
  ) {
    return next(errorHandler(403, "Forbidden admin"));
  }
  if (!venue) {
    return next(errorHandler(404, "Venue not found"));
  }
  try {
    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.venueID,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Venue has been updated", updatedVenue });
  } catch (error) {
    next(error);
  }
};

export const selectVenue = async (req, res, next) => {
  try {
    const venue = await Venue.findById(req.params.VenueID);
    if (!venue) {
      return next(errorHandler(404, "Venue not found"));
    }
    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
};
