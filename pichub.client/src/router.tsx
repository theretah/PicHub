import { createBrowserRouter } from "react-router-dom";
import CreatePost from "./pages/CreatePost/CreatePost";
import Explore from "./pages/Explore/Explore";
import ExploreReel from "./pages/ExploreReel/ExploreReel";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import Notifications from "./pages/Notifications/Notifications";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage";
import Posts from "./pages/Profile/Posts";
import ProfileReels from "./pages/Profile/ProfileReels";
import Saved from "./pages/Profile/Saved";
import Tagged from "./pages/Profile/Tagged";
import Reels from "./pages/Reels/Reels";
import Register from "./pages/Register/Register";
import EditProfile from "./pages/Settings/EditProfile";
import Account from "./pages/Settings/Account";
import ErrorPage from "./pages/ErrorPage";
import Direct from "./pages/Messages/Direct";
import Inbox from "./pages/Messages/Inbox";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/:userName", element: <Posts /> },
      { path: "/:userName/reels", element: <ProfileReels /> },
      { path: "/:userName/tagged", element: <Tagged /> },
      { path: "/saved", element: <Saved /> },
      { path: "/post/:id", element: <PostDetailsPage /> },
      { path: "/explore", element: <Explore /> },
      { path: "/explore/reels", element: <ExploreReel /> },
      { path: "/messages/inbox", element: <Inbox /> },
      { path: "/messages/direct/:userName", element: <Direct /> },
      { path: "/createPost", element: <CreatePost /> },
      { path: "/reels", element: <Reels /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/settings/editprofile", element: <EditProfile /> },
      { path: "/settings/accountprivacy", element: <Account /> },
    ],
  },
]);
export default router;
