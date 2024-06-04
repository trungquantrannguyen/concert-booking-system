import Booking from "../models/booking.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY);

export const getAllUserBooking = async (req, res, next) => {
  if (req.use.id === req.params.id) {
    try {
      const bookings = await Booking.find({ user: req.params.id });
      res.status(200).json(bookings);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "You can only get your bookings"));
  }
};

export const selectBooking = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const booking = await Booking.findById(req.params.bookingID);
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "You can only select your booking"));
  }
};

// export const confirmBooking = async (req,res,next) => {
//     try{
//          const session =  await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             success_url: "",
//             cancel_url:
//          })
//          res.status(200).json({url: session.url})
//     } catch(error) {
//         next(error)
//     }
// }

// export const createBooking = async (req, res, next) => {
//   let paymentStatus = "incomplete";
//   try {
//     const { numOfTicket, totalPrice, concertID } = req.body;
//   } catch (error) {
//     next(error);
//   }
// };
