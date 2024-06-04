import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    numberOfTicket: {
      type: Number,
      require: true,
    },
    totalPrice: {
      type: Number,
      require: true,
    },
    bookingDate: {
      type: Date,
      require: true,
    },
    paymentStatus: {
      type: String,
      require: true,
    },
    receipt: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    concert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Concert",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
