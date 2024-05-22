import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./App.css";
const Layout = lazy(() => import("./components/layout/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const NoMatch = lazy(() => import("./pages/NoMatch"));
const Loader = lazy(() => import("./components/ui/Loader.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
