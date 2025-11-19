import { Route, Routes, useLocation } from "react-router-dom";
import type { RouteItem } from "./DTOs";
import { Home } from "./pages";
import Login from "./pages/Login";
import Legister from "./pages/Register";
import Connect from "./pages/Connect";
import Dashboard from "./pages/Dashboard";
import Endview from "./pages/Endview";

/**
 * routelistにpathとelementを設定することで
 * roudingできるお
 */
const routeList: RouteItem[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Legister /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/connect", element: <Connect /> },
  { path: "/endview", element: <Endview /> },
];

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {routeList.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default App;
