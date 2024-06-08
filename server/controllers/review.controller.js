import Review from "../models/review.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getAllReviewsFromConcert = async (req, res, next) => {
  try {
    const reviews = await Review.find({ concert: req.params.concertID }).exec();
    // console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  const { rating, comment, concertID } = req.body;
  const newReview = {
    rating,
    comment,
    user: req.user.id,
    concert: concertID,
  };
  try {
    const review = await Review.create(newReview);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  if (
    req.params.id != process.env.ADMIN1ID &&
    req.params.id != process.env.ADMIN2ID &&
    req.params.id != req.user.id
  ) {
    return next(errorHandler(403, "You can only delete your review"));
  }
  const review = await Review.findById(req.params.reviewID);
  if (!review) {
    return next(errorHandler(404, "Review not found"));
  }
  try {
    await Review.findByIdAndDelete(req.params.reviewID);
    res.status(200).json("Review has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  if (req.user.id !== req.params.userID) {
    return res.status(403).json("You can only edit your review");
  }
  const { rating, comment } = req.body;
  const review = await Review.findById(req.params.reviewID);
  if (!review) {
    return next(errorHandler(404, "Review not found"));
  }
  try {
    const newReview = await Review.findByIdAndUpdate(
      req.params.reviewID,
      {
        rating,
        comment,
      },
      { new: true }
    );
    console.log(newReview);
    res.status(200).json({ message: "Review has been updated", newReview });
  } catch (error) {
    next(error);
  }
};
