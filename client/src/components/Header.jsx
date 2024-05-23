import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "../components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import SideBar from "./SideBar";

const Header = () => {
  return (
    // Header component
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      {/* Sheet component for responsive sidebar */}
      <Sheet>
        <SheetTrigger>
          {/* Trigger for the sidebar */}
          <span className="lg:hidden flex gap-2" href="#">
            {/* Icon and title */}
            <GraduationCapIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </span>
        </SheetTrigger>
        {/* Content of the sheet, which is the sidebar */}
        <SheetContent>
          <SideBar />
        </SheetContent>
      </Sheet>

      {/* Spacer to push the dropdown menu to the right */}
      <div className="w-full flex-1"></div>

      {/* Dropdown menu for user options */}
      <DropdownMenu>
        {/* Trigger for the dropdown menu */}
        <DropdownMenuTrigger asChild>
          {/* Button containing user avatar */}
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            {/* User avatar */}
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="https://github.com/shadcn.png"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            {/* Screen reader text */}
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        {/* Content of the dropdown menu */}
        <DropdownMenuContent align="end">
          {/* Label for the user account section */}
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          {/* Separator between sections */}
          <DropdownMenuSeparator />
          {/* Menu item for logout */}
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;

// SVG icon component for the graduation cap
function GraduationCapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  );
}
