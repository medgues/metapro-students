// Sample data for students
var studentsList = [
  {
    fullName: "Ahmed",
    subjects: ["french", "mathematics", "science"],
    dateOfBirth: "03/08/1991",
    subscriptionStatus: "paid",
    id: 123,
  },
  {
    fullName: "djef",
    subjects: ["french"],
    dateOfBirth: "12/11/1998",
    subscriptionStatus: "expired",
    id: 143,
  },
];

// Controller function to get all students
const getStudents = async (req, res) => {
  try {
    const students = studentsList; // Retrieve all students from the list
    res.status(200).json(students); // Respond with the list of students
  } catch (err) {
    res.status(400).json({ err: err.message }); // Handle errors
  }
};

// Controller function to create a new student
const createStudent = async (req, res) => {
  const student = req.body; // Extract student data from the request body
  try {
    studentsList.push(student); // Add the new student to the list
    res.status(200).json(studentsList); // Respond with the updated list of students
  } catch (err) {
    res.status(400).json({ err: true, message: err.message }); // Handle errors
  }
};

// Controller function to get a student by ID
const getStudentById = async (req, res) => {
  const { id } = req.params; // Extract the student ID from the request parameters
  try {
    const student = studentsList.filter((student) => student.id === +id); // Find the student with the given ID
    res.status(200).json(...student); // Respond with the student details
  } catch (err) {
    res.status(400).json({ err: err.message }); // Handle errors
  }
};

// Controller function to delete a student by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params; // Extract the student ID from the request parameters
  try {
    const toBeDeletedStudent = studentsList.filter(
      (student) => student.id == +id
    ); // Find the student to be deleted
    if (!toBeDeletedStudent) {
      return res.status(404).json({ err: "Student not Found!" }); // Return 404 if student not found
    }
    studentsList = studentsList.filter((student) => student.id !== +id); // Remove the student from the list
    return res
      .status(200)
      .json({ message: "Student deleted successfully", studentsList }); // Respond with success message and updated list
  } catch (err) {
    res.status(400).json({ err: true, message: err.message }); // Handle errors
  }
};

// Controller function to update a student by ID
const updateStudent = async (req, res) => {
  const { id } = req.params; // Extract the student ID from the request parameters
  const update = req.body; // Extract the updated student data from the request body
  try {
    const toBeUpdatedStudent = studentsList.find(
      (student) => student.id === +id
    ); // Find the student to be updated
    if (!toBeUpdatedStudent) {
      return res.status(404).json({ err: "Student not Found!" }); // Return 404 if student not found
    }
    // Update the student details if provided in the request body
    if (update.fullName) {
      toBeUpdatedStudent.fullName = update.fullName;
    }
    if (update.subjects) {
      toBeUpdatedStudent.subjects = update.subjects;
    }
    if (update.dateOfBirth) {
      toBeUpdatedStudent.dateOfBirth = update.dateOfBirth;
    }
    if (update.subscriptionStatus) {
      toBeUpdatedStudent.subscriptionStatus = update.subscriptionStatus;
    }
    return res.status(200).json(studentsList); // Respond with updated list of students
  } catch (err) {
    res.status(400).json({ err: true, message: err.message }); // Handle errors
  }
};

// Export the controller functions to make them available for use in other files
module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  deleteStudent,
  updateStudent,
};
