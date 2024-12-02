/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: API endpoints for managing property listings
 */

const router = require('express').Router();
const multer = require('multer');

const Listing = require('../models/Listing');
const User = require('../models/User');

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * /properties/create:
 *   post:
 *     summary: Create a new property listing
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - creator
 *               - category
 *               - type
 *               - streetAddress
 *               - city
 *               - province
 *               - country
 *               - guestCount
 *               - bedroomCount
 *               - bedCount
 *               - bathroomCount
 *               - title
 *               - description
 *               - price
 *             properties:
 *               creator:
 *                 type: string
 *                 description: ID of the user creating the listing
 *               category:
 *                 type: string
 *                 description: Category of the property
 *               type:
 *                 type: string
 *                 description: Type of the property (e.g., apartment, house)
 *               streetAddress:
 *                 type: string
 *                 description: Street address of the property
 *               aptSuite:
 *                 type: string
 *                 description: Apartment or suite number
 *               city:
 *                 type: string
 *                 description: City where the property is located
 *               province:
 *                 type: string
 *                 description: Province/state of the property
 *               country:
 *                 type: string
 *                 description: Country where the property is located
 *               guestCount:
 *                 type: number
 *                 description: Maximum number of guests
 *               bedroomCount:
 *                 type: number
 *                 description: Number of bedrooms
 *               bedCount:
 *                 type: number
 *                 description: Number of beds
 *               bathroomCount:
 *                 type: number
 *                 description: Number of bathrooms
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of amenities
 *               title:
 *                 type: string
 *                 description: Title of the listing
 *               description:
 *                 type: string
 *                 description: Detailed description of the listing
 *               highlight:
 *                 type: string
 *                 description: Highlight feature of the listing
 *               highlightDesc:
 *                 type: string
 *                 description: Description of the highlight feature
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price per night
 *               listingPhotos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Photos of the listing
 *     responses:
 *       200:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       409:
 *         description: Failed to create listing
 */
/* CREATE LISTING */
router.post('/create', upload.array('listingPhotos'), async (req, res) => {
  try {
    /* Take the information from the form */
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send('No file uploaded.');
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res
      .status(409)
      .json({ message: 'Fail to create Listing', error: err.message });
    console.log(err);
  }
});

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get listings by category
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (optional)
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Failed to fetch listings
 */
/* GET lISTINGS BY CATEGORY */
router.get('/', async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        'creator'
      );
    } else {
      listings = await Listing.find().populate('creator');
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: 'Fail to fetch listings', error: err.message });
    console.log(err);
  }
});

/**
 * @swagger
 * /properties/search/{search}:
 *   get:
 *     summary: Search for listings by keyword
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search (use "all" to fetch all listings)
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Failed to fetch listings
 */
/* GET LISTINGS BY SEARCH */
router.get('/search/:search', async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === 'all') {
      listings = await Listing.find().populate('creator');
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
        ],
      }).populate('creator');
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: 'Fail to fetch listings', error: err.message });
    console.log(err);
  }
});

/**
 * @swagger
 * /properties/{listingId}:
 *   get:
 *     summary: Get a listing by its ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: listingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the listing
 *     responses:
 *       200:
 *         description: Details of the listing and host information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listingData:
 *                   $ref: '#/components/schemas/Listing'
 *                 hostInfoData:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Host's user ID
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     profileImagePath:
 *                       type: string
 *                       description: Path to the host's profile image
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */
/* GET LISTING BY ID */
router.get('/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;
    const listingData = await Listing.findById(listingId);

    if (!listingData) {
      return res
        .status(404)
        .json({ message: 'Fail to fetch listings', error: err.message });
    }

    const _user = await User.findById(listingData.creator);
    if (!listingData) {
      return res
        .status(404)
        .json({ message: 'Fail to fetch listings', error: err.message });
    }

    const hostInfoData = {
      _id: _user._id,
      firstName: _user.firstName,
      lastName: _user.lastName,
      profileImagePath: _user.profileImagePath,
    };
    res.status(200).json({ listingData, hostInfoData });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    console.log(err);
  }
});
module.exports = router;
