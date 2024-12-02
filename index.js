const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const envFile = fs.existsSync('.env.local') ? '.env.local' : '.env';
const dotenv = require('dotenv').config({ path: envFile });
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth.js');
const listingRoutes = require('./routes/listing.js');
const bookingRoutes = require('./routes/booking.js');
const userRoutes = require('./routes/user.js');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// To allow only specific origins:
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow specific HTTP methods
  })
);

/* ROUTES */
app.use('/auth', authRoutes);
app.use('/properties', listingRoutes);
app.use('/bookings', bookingRoutes);
app.use('/users', userRoutes);

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DuckCuongHomie Backend API Documentation',
      version: '1.0.0',
      description:
        'API documentation for Booking, Listing, and User management.',
    },
    servers: [
      {
        url: process.env.SERVER_URL, // Adjust based on your deployment
      },
    ],
  },
  apis: ['./models/*.js', './routes/*.js'], // Adjust paths as needed
};

// Swagger Docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3002;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: 'duckcuonghomie',
  })
  .then(() => {
    console.log('CONNECTED TO DATABASE SUCCESSFULLY');
    app.listen(PORT, () =>
      console.log(`Server Port: http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log(`${err} did not connect`));

