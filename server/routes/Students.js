// Import the Express framework
const express = require("express");

// Create a router instance to handle routes
const router = express.Router();

// Import controller functions from the StudentsController module
const {
  getStudents,
  createStudent,
  getStudentById,
  deleteStudent,
  updateStudent,
} = require("../controllers/StudentsController");

// Define routes and associate them with controller functions

// Route to get all students
router.get("/", getStudents);

// Route to create a new student
router.post("/", createStudent);

// Route to get a student by ID
router.get("/student/:id", getStudentById);

// Route to delete a student by ID
router.delete("/:id", deleteStudent);

// Route to update a student by ID
router.patch("/:id", updateStudent);

// Export the router to make it available for use in other files
module.exports = router;
