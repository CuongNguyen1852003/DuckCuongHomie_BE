/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - customerId
 *         - hostId
 *         - listingId
 *         - startDate
 *         - endDate
 *         - totalPrice
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the booking
 *         customerId:
 *           type: string
 *           description: The ID of the user who made the booking
 *         hostId:
 *           type: string
 *           description: The ID of the host for the booking
 *         listingId:
 *           type: string
 *           description: The ID of the listing for the booking
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the booking
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the booking
 *         totalPrice:
 *           type: number
 *           description: The total price for the booking
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the booking was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last time the booking was updated
 *       example:
 *         _id: "64c8eecb7483b6c5d29f1c34"
 *         customerId: "64c8f2a2a7d1b6a5d25f1a12"
 *         hostId: "64c8f3c3b6e3b7c6d22f1d55"
 *         listingId: "64c8f4e3c9d3c7a8f27f1e77"
 *         startDate: "2024-12-01"
 *         endDate: "2024-12-05"
 *         totalPrice: 400
 *         createdAt: "2024-11-30T14:48:00.000Z"
 *         updatedAt: "2024-11-30T14:50:00.000Z"
 */
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Listing',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
