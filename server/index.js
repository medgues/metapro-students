// Load environment variables from .env file
require("dotenv").config();

// Import the CORS middleware
var cors = require("cors");

// Import Express
const express = require("express");
const path = require("path");
// Import the router for handling student-related routes
const studentRouter = require("./routes/Students");

// Create an Express app instance
const app = express();

// Enable CORS middleware to allow requests from different origins
app.use(cors());

// Set the port number
const port = process.env.PORT || 2000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the student router under the "/api/students" path
app.use("/api/students", studentRouter);

app.use(express.static(path.join(__dirname, "/public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
