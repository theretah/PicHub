import { Link, Navigate } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import useSavedPosts from "../../react-query/hooks/postHooks/useSavedPosts";
import Profile from "../../components/Profile/Profile";
import useAuthStore from "../../auth/authStore";

const Saved = () => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to={"/login"} />;

  const { data, error, isLoading } = useSavedPosts(user.id);
  if (error) return <p className="text-light">{error.message}</p>;

  return (
    <Profile userName={user.userName} activeTab="saved">
      {isLoading && <LoadingIndicator />}
      {data?.map((post) => (
        <div className="col-4" key={post.id} style={{ padding: 0.65 }}>
          <Link to={`/post/${post.id}`}>
            <img
              src={`data:image/png;base64,${post.photoContent}`}
              className="img-fluid mx-auto object-fit-cover"
              alt="..."
              style={{ aspectRatio: 1 }}
            />
          </Link>
        </div>
      ))}
    </Profile>
  );
};

export default Saved;
