const express = require("express");
const router = express.Router();
const {
  getStudents,
  createStudent,
  getStudentById,
  deleteStudent,
  updateStudent,
} = require("../controllers/StudentsController");
//get students
router.get("/", getStudents);

//create student
router.post("/", createStudent);

//get student  by id
router.get("/student/:id", getStudentById);

//delete student  by id
router.delete("/:id", deleteStudent);

//update student  by id
router.patch("/:id", updateStudent);

module.exports = router;
