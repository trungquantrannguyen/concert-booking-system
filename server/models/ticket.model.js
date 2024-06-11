import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketClass: {
      type: String,
      require: true,
    },
    seatNumber: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  },
  { timestamps: true }
);

const Ticket = new mongoose.model("Ticket", ticketSchema);

export default Ticket;
