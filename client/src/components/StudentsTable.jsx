import { lazy, useContext, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { DialogTrigger, Dialog } from "../components/ui/dialog";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "../components/ui/table";
import AddStudentForm from "./AddStudentForm";
import store from "../store/store";
import { studentsList } from "../store/slices/globaleStateSlice";
import { GlobalState } from "../contexts/GlobalStateContext";
import { toast } from "./ui/use-toast";
const EditStudentForm = lazy(() => import("./EditStudentForm"));

const StudentsTable = () => {
  const [students, setStudents] = useState([]); // State to manage the list of students
  const [open, setOpen] = useState(false); // State to manage the open/close status of Add Student dialog
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to manage the open/close status of Edit Student dialog
  const [dialog, setDialog] = useState(); // State to manage the student data in the dialog
  const { setIsLoading, setIsError, setError, setIsSuccess } =
    useContext(GlobalState); // Context for global state management
  console.log(students);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:2000/api/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data); // Set the students data
        store.dispatch(studentsList([...data])); // Update the global state with the students data
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(true); // Set error state
        setError(error.message); // Set error message
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteStudent = (id) => {
    setIsLoading(true);
    fetch(`http://localhost:2000/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.studentsList); // Update the students state after deletion
        store.dispatch(studentsList(data.studentsList)); // Update the global state after deletion
        setIsLoading(false);
        setIsSuccess(true);
        toast({
          title: "Success",
          description: "Student deleted successfully",
        });
      })
      .catch((error) => {
        setIsError(true); // Set error state
        setError(error.message); // Set error message
        setIsLoading(false);
        toast({
          title: "Error",
          description: error.message,
        });
      });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Students</h1>
        {/* Dialog for adding a new student */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="ml-auto" size="sm">
              Add Student
            </Button>
          </DialogTrigger>
          <AddStudentForm setOpen={setOpen} setStudents={setStudents} />
        </Dialog>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <span className="py-3">
                <p className="text-sm text-muted-foreground px-5 uppercase">
                  No students found, please add students
                </p>
              </span>
            ) : (
              //  Dialog for editing a student
              <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
                {students?.map((student) => (
                  <TableRow key={student?.id}>
                    <TableCell className="font-medium flex flex-col">
                      <span>{student?.fullName}</span>
                      <span>{student?.dateOfBirth}</span>
                    </TableCell>
                    <TableCell>
                      {student?.subjects?.map((subject) => (
                        <span className="mx-2 " key={subject}>
                          {subject}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>{student?.subscriptionStatus}</TableCell>
                    <TableCell className="text-right">
                      <DialogTrigger
                        asChild
                        onClick={() => {
                          setDialog(student);
                        }}
                      >
                        <Button className="mr-2" size="sm" variant="outline">
                          Edit
                        </Button>
                      </DialogTrigger>
                      <Button
                        onClick={() => deleteStudent(student?.id)}
                        className="text-red-500"
                        size="sm"
                        variant="outline"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <EditStudentForm
                  setOpen={setOpenEditDialog}
                  setStudents={setStudents}
                  student={
                    dialog || {
                      fullName: "",
                      dateOfBirth: "",
                      subjects: [],
                      subscriptionStatus: "",
                      id: "",
                    }
                  }
                />
              </Dialog>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default StudentsTable;
