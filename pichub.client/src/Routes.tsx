import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import PageDetails from "./pages/PageDetails/PageDetails";
import Register from "./pages/Register/Register";

const Routes = [
  { path: "/", element: <Index /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/page", element: <PageDetails /> },
];

export default Routes;
