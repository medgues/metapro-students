import { useEffect, useState } from "react";
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
import EditStudentForm from "./EditStudentForm";
const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [dialog, setDialog] = useState();
  useEffect(() => {
    console.log("dialog", dialog);
  }, [dialog]);

  useEffect(() => {
    fetch("http://localhost:2000/api/students/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        store.dispatch(studentsList([...data]));
      });
    //   .catch((error) => {
    //     // Handle errors
    //   });
  }, []);
  const deletStudent = (id) => {
    fetch(`http://localhost:2000/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.studentsList);
        store.dispatch(studentsList(data.studentsList));
      });
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Students</h1>
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
            <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
              {students?.map((student) => (
                <TableRow key={student?.id}>
                  <TableCell className="font-medium flex flex-col">
                    <span>{student?.fullName}</span>
                    <span> {student?.dateOfBirth}</span>
                  </TableCell>
                  <TableCell className="">
                    {student?.subjects?.map((subject) => (
                      <span className="mx-2" key={subject}>
                        {subject}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>{student?.subscriptionStatus}</TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setDialog(student.id);
                      }}
                    >
                      <Button className="mr-2" size="sm" variant="outline">
                        Edit
                      </Button>
                    </DialogTrigger>
                    <Button
                      onClick={() => deletStudent(student?.id)}
                      className="text-red-500"
                      size="sm"
                      variant="outline"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}{" "}
              <EditStudentForm
                setOpen={setOpenEditDialog}
                setStudents={setStudents}
                student={
                  dialog
                    ? students.filter((student) => student.id === dialog)[0]
                    : {
                        fullName: "",
                        dateOfBirth: "",
                        subjects: [],
                        subscriptionStatus: "",
                        id: "",
                      }
                }
              />{" "}
            </Dialog>
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default StudentsTable;
