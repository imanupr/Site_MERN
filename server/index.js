const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRouter = require("./Routes");
const cookieparser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Use CORS before routes



const corsOptions = {
    origin: 'https://site-mernclientside.vercel.app',  // Correct frontend URL without the trailing '/'
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
  };
  
  app.use(cors(corsOptions)); // Apply CORS options globally
  

// Use other middleware
app.use(express.json());
app.use(cookieparser());

// Database connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Your routes
app.use("/api", apiRouter);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
