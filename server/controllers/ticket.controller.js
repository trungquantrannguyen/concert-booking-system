import Booking from "../models/booking.model.js";
import Concert from "../models/conert.model.js";
import Ticket from "../models/ticket.model.js";
import Venue from "../models/venue.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getTicketsfromBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingID);
  if (!booking) {
    return next(errorHandler(404, "Booking not found"));
  }
  try {
    const tickets = Ticket.find({ booking: booking });
    res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (ticketClass, concertID) => {
  const venue = await Venue.findById(Concert.findById(concertID).venue);
  console.log(venue.seatClass);
  console.log(venue.priceRange);

  venue.seatClass.forEach(async (seat, capacity) => {
    if (ticketClass == seat) {
      const remaining = capacity;
      const seatNumber = capacity - remaining;
      const price = venue.priceRange[seat];
      const ticket = await Ticket.create({
        ticketClass: seat,
        seatNumber: seatNumber,
        price: price,
      });
      return ticket;
    }
  });
};
