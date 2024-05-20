var studentsList = [
  { name: "Ahmed", age: 25, id: 123 },
  { name: "Ali", age: 30, id: 345 },
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
const getStudentbyId = async (req, res) => {
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
  console.log("delete request not recieved");

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
    if (update.name) {
      toBeUpdatedStudent.name = update.name;
    }

    if (update.age) {
      toBeUpdatedStudent.age = update.age;
    }
    console.log("updated product", toBeUpdatedStudent);
    return res.status(200).json(toBeUpdatedStudent);
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};

module.exports = {
  getStudents,
  createStudent,
  getStudentbyId,
  deleteStudent,
  updateStudent,
};