/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The hashed password of the user
 *         profileImagePath:
 *           type: string
 *           description: The URL of the user's profile image
 *           default: ""
 *         tripList:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of trip IDs associated with the user
 *         wishList:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of listing IDs added to the user's wishlist
 *         propertyList:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of property IDs owned by the user
 *         reservationList:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of reservation IDs associated with the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last time the user's information was updated
 *       example:
 *         _id: "64d8eecb7483b6c5d29f1c34"
 *         firstName: "John"
 *         lastName: "Doe"
 *         email: "john.doe@example.com"
 *         password: "hashedPassword123"
 *         profileImagePath: "https://example.com/profile.jpg"
 *         tripList: ["64d8eecb7483b6c5d29f1c34", "64d8eecb7483b6c5d29f1c35"]
 *         wishList: ["64d8eecb7483b6c5d29f1c36"]
 *         propertyList: ["64d8eecb7483b6c5d29f1c37"]
 *         reservationList: ["64d8eecb7483b6c5d29f1c38"]
 *         createdAt: "2024-11-30T14:48:00.000Z"
 *         updatedAt: "2024-11-30T14:50:00.000Z"
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: '',
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
module.exports = User;
