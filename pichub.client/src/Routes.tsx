import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export default Routes;
