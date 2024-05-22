import SideBar from "../components/SideBar";
import Header from "../components/Header";
import StudentsTable from "../components/StudentsTable";

export default function Component() {
  return (
    <div className="grid min-h-screen w-screen grid-cols-[100%] sm:grid-cols-[280px_1fr] bg-gray-100 dark:bg-gray-950">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <SideBar />
      </div>
      <div className="flex flex-col ">
        <Header />
        <StudentsTable />
      </div>
    </div>
  );
}
