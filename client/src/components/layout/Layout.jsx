import { Outlet } from "react-router-dom";

// Define a layout component
const Layout = () => {
  // Render the Outlet component, which renders the matched child route components
  return <Outlet />;
};

// Export the layout component as the default export
export default Layout;
