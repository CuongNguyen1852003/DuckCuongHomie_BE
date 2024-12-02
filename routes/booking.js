/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API endpoints for managing bookings
 */

const router = require('express').Router();
const Booking = require('../models/Booking');

/**
 * @swagger
 * /bookings/create:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - hostId
 *               - listingId
 *               - startDate
 *               - endDate
 *               - totalPrice
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: ID of the customer making the booking
 *               hostId:
 *                 type: string
 *                 description: ID of the host owning the listing
 *               listingId:
 *                 type: string
 *                 description: ID of the listing being booked
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the booking
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the booking
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: Total price of the booking
 *     responses:
 *       200:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Failed to create a new booking
 */
/* CREATE BOOKING */
router.post('/create', async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: 'Fail to create a new Booking!', error: err.message });
  }
});

module.exports = router;
