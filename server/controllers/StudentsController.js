var studentsList = [
  {
    fullName: "Ahmed",
    subjects: ["french", "math", "Science"],
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

const getStudents = async (req, res) => {
  try {
    //get all student
    const students = studentsList;
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
//create student
const createStudent = async (req, res) => {
  const student = req.body;
  try {
    studentsList.push(student);
    res.status(200).json(studentsList);
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};
//get student by id
const getStudentById = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    //get student by id
    const student = studentsList.filter((student) => student.id === +id);
    console.log("student", student);
    res.status(200).json(...student);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//delete a product
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);

  try {
    const toBeDeletedStudent = studentsList.filter(
      (student) => student.id == +id
    );
    if (!toBeDeletedStudent) {
      return res.status(404).json({ err: "Student not Found!" });
    }
    studentsList = studentsList.filter((student) => student.id !== +id);
    return res
      .status(200)
      .json({ message: "Student deleted seccusfully", studentsList });
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};
//update a Student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  console.log("update", update);

  try {
    const toBeUpdatedStudent = studentsList.find(
      (student) => student.id === +id
    );
    if (!toBeUpdatedStudent) {
      return res.status(404).json({ err: "Student not Found!" });
    }
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
    console.log("updated Student", toBeUpdatedStudent);
    return res.status(200).json(studentsList);
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentById,
  deleteStudent,
  updateStudent,
};
