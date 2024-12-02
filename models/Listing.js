/**
 * @swagger
 * components:
 *   schemas:
 *     Listing:
 *       type: object
 *       required:
 *         - creator
 *         - category
 *         - type
 *         - streetAddress
 *         - aptSuite
 *         - city
 *         - province
 *         - country
 *         - guestCount
 *         - bedroomCount
 *         - bedCount
 *         - bathroomCount
 *         - title
 *         - description
 *         - highlight
 *         - highlightDesc
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the listing
 *         creator:
 *           type: string
 *           description: The ID of the user who created the listing
 *         category:
 *           type: string
 *           description: The category of the listing (e.g., apartment, house)
 *         type:
 *           type: string
 *           description: The type of the listing (e.g., entire place, shared room)
 *         streetAddress:
 *           type: string
 *           description: The street address of the listing
 *         aptSuite:
 *           type: string
 *           description: The apartment or suite number of the listing
 *         city:
 *           type: string
 *           description: The city where the listing is located
 *         province:
 *           type: string
 *           description: The province/state where the listing is located
 *         country:
 *           type: string
 *           description: The country where the listing is located
 *         guestCount:
 *           type: number
 *           description: The number of guests the listing can accommodate
 *         bedroomCount:
 *           type: number
 *           description: The number of bedrooms in the listing
 *         bedCount:
 *           type: number
 *           description: The number of beds in the listing
 *         bathroomCount:
 *           type: number
 *           description: The number of bathrooms in the listing
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of amenities available in the listing
 *         listingPhotoPaths:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of photo URLs for the listing
 *         title:
 *           type: string
 *           description: The title of the listing
 *         description:
 *           type: string
 *           description: A detailed description of the listing
 *         highlight:
 *           type: string
 *           description: A highlight feature of the listing
 *         highlightDesc:
 *           type: string
 *           description: A description of the highlight feature
 *         price:
 *           type: number
 *           description: The price of the listing per night
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the listing was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last time the listing was updated
 *       example:
 *         _id: "64d8eecb7483b6c5d29f1c34"
 *         creator: "64d8f2a2a7d1b6a5d25f1a12"
 *         category: "Apartment"
 *         type: "Entire Place"
 *         streetAddress: "123 Main Street"
 *         aptSuite: "Apt 4B"
 *         city: "New York"
 *         province: "NY"
 *         country: "USA"
 *         guestCount: 4
 *         bedroomCount: 2
 *         bedCount: 2
 *         bathroomCount: 2
 *         amenities: ["Wi-Fi", "Air Conditioning", "Kitchen"]
 *         listingPhotoPaths: ["https://example.com/photo1.jpg", "https://example.com/photo2.jpg"]
 *         title: "Cozy Apartment in Downtown"
 *         description: "A beautiful and comfortable apartment located in the heart of the city."
 *         highlight: "Great Location"
 *         highlightDesc: "Close to public transport and city attractions."
 *         price: 150
 *         createdAt: "2024-11-30T14:48:00.000Z"
 *         updatedAt: "2024-11-30T14:50:00.000Z"
 */
const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    highlight: {
      type: String,
      required: true,
    },
    highlightDesc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
