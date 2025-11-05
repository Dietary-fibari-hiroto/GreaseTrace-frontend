import { Route, Routes, useLocation } from "react-router-dom";
import type { RouteItem } from "./DTOs";
import { Home } from "./pages";

/**
 * routelistにpathとelementを設定することで
 * roudingできるお
 */
const routeList: RouteItem[] = [{ path: "/", element: <Home /> }];

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
