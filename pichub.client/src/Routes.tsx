import { useRoutes } from "react-router-dom";
import CreatePost from "./pages/CreatePost/CreatePost";
import Explore from "./pages/Explore/Explore";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import Messages from "./pages/Messages/Messages";
import Notifications from "./pages/Notifications/Notifications";
import PageDetails from "./pages/PageDetails/PageDetails";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import Reels from "./pages/Reels/Reels";
import Register from "./pages/Register/Register";
import Settings from "./components/Settings/SettingsLayout";
import ExploreReel from "./pages/ExploreReel/ExploreReel";

const AppRoutes = () => {
  const Routes = [
    { path: "/", element: <Index /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/page/:userName", element: <PageDetails /> },
    { path: "/post/:id", element: <PostDetailsPage /> },
    { path: "/explore", element: <Explore /> },
    { path: "/explore/reels", element: <ExploreReel /> },
    { path: "/messages", element: <Messages /> },
    { path: "/createPost", element: <CreatePost /> },
    { path: "/reels", element: <Reels /> },
    { path: "/notifications", element: <Notifications /> },
    { path: "/settings/editprofile", element: <Settings /> },
    { path: "/settings/accountprivacy", element: <Settings /> },
  ];
  return useRoutes(Routes);
};

export default AppRoutes;
