const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRouter = require("./Routes");
const cookieparser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieparser());

// Enable CORS with the correct origin (your frontend URL)
app.use(cors({
  origin: 'https://site-mernfrontend.vercel.app', // Correct frontend URL
  methods: 'GET, POST, PUT, DELETE', // Allowed HTTP methods
  credentials: true, // Allow credentials if needed (e.g., cookies)
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
