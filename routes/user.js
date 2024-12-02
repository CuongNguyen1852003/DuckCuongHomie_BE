const router = require('express').Router();

const Booking = require('../models/Booking');
const User = require('../models/User');
const Listing = require('../models/Listing');

/**
 * @swagger
 * /users/{userId}/trips:
 *   get:
 *     summary: Get a list of trips for a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       202:
 *         description: A list of trips for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tripListData:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Cannot find trips for the user
 *       500:
 *         description: Server error
 */
/* GET TRIP LIST */
router.get('/:userId/trips', async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      'customerId hostId listingId'
    );

    if (!trips) {
      res.status(404).json({ message: 'Can not find trips!' });
    }

    res.status(202).json({ tripListData: trips });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.log(err);
  }
});

/**
 * @swagger
 * /users/{userId}/{listingId}:
 *   patch:
 *     summary: Add or remove a listing to/from the user's wishlist
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The listing's ID
 *     responses:
 *       200:
 *         description: Listing added or removed from the wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 wishList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Failed to update wishlist
 *       500:
 *         description: Server error
 */
/* ADD LISTING TO WISHLIST */
router.patch('/:userId/:listingId', async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate('creator');

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: 'Listing is removed from wish list',
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: 'Listing is added to wish list',
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

/**
 * @swagger
 * /users/{userId}/properties:
 *   get:
 *     summary: Get a list of properties owned by the user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       202:
 *         description: A list of properties owned by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Cannot find properties for the user
 */
/* GET PROPERTY LIST */
router.get('/:userId/properties', async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      'creator'
    );
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: 'Can not find properties!', error: err.message });
  }
});

/**
 * @swagger
 * /users/{userId}/reservations:
 *   get:
 *     summary: Get a list of reservations for the user as host
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       202:
 *         description: A list of reservations for the user as host
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Cannot find reservations for the user
 */
/* GET RESERVATION LIST */
router.get('/:userId/reservations', async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      'customerId hostId listingId'
    );
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: 'Can not find reservations!', error: err.message });
  }
});

module.exports = router;
