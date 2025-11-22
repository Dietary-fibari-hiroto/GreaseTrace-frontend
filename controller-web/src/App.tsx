import { Route, Routes, useLocation } from "react-router-dom";
import type { RouteItem } from "./DTOs";
import { Connect, Dashboard, Endview, Home, Login, Register,View } from "./pages";

/**
 * routelistにpathとelementを設定することで
 * roudingできるお
 */
const routeList: RouteItem[] = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/connect", element: <Connect /> },
  { path: "/endview", element: <Endview /> },
  { path: "/view",element: <View />},
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
