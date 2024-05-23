import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./App.css";
import { GlobalStateContextProvider } from "./contexts/GlobalStateContext";

// Lazy loading components for better performance and code splitting
const Layout = lazy(() => import("./components/layout/Layout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const NoMatch = lazy(() => import("./pages/NoMatch"));
const Loader = lazy(() => import("./components/ui/Loader.jsx"));

function App() {
  return (
    // Providing global state context to the entire application
    <GlobalStateContextProvider>
      {/* Suspense component is used to show a fallback (Loader) while lazy-loaded components are being fetched */}
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            {/* Define the main route with the Layout component */}
            <Route path="/" element={<Layout />}>
              {/* Default route (index) loads the Login component */}
              <Route index element={<Login />} />
              {/* Route for the Dashboard component */}
              <Route path="home" element={<Dashboard />} />
              {/* Catch-all route for undefined paths, loads NoMatch component */}
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </GlobalStateContextProvider>
  );
}

export default App;
