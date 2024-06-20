import Booking from "../models/booking.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import Stripe from "stripe";
import { createTicket } from "./ticket.controller.js";
import Concert from "../models/concert.model.js";
import Ticket from "../models/ticket.model.js";

export const getAllUserBooking = async (req, res, next) => {
  if (req.user.id === req.params.id) {
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

export const confirmBooking = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const tickets = [];
  console.log("something");
  try {
    for (let index = 0; index < req.body.numOfTicket; index++) {
      const ticket = await createTicket(
        req.body.ticketClass,
        req.body.concertID
      );
      // console.log(ticket);
      tickets.push(ticket);
    }
    // console.log("From booking " + tickets);

    const concert = await Concert.findById(req.body.concertID);
    const concertName = concert.name;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: tickets.map((ticket) => {
        return {
          price_data: {
            currency: "vnd",
            product_data: {
              name: `${concertName} seat ${ticket.ticketClass}${ticket.seatNumbeer}`,
            },
            unit_amount: ticket.price,
          },
          quantity: 1,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/buy-ticket`,
    });
    res.status(200).json({ url: session.url, tickets });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  const { numOfTicket, totalPrice, tickets, concertID } = req.body;
  const bookingDate = new Date().getTime();
  const userID = req.user.id;
  const paymentStatus = "Complete";
  const newBooking = {
    numOfTicket,
    totalPrice,
    bookingDate,
    paymentStatus,
    user: userID,
    tickets,
    concert: concertID,
  };
  console.log(newBooking);
  try {
    const booking = await Booking.create(newBooking);
    for (const ticketID of tickets) {
      await Ticket.findByIdAndUpdate(ticketID, { booking: booking._id });
    }
    res.status(201).json({ booking });
  } catch (error) {
    next(error);
  }
};
