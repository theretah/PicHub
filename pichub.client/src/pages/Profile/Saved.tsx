import { Link } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import useSavedPosts from "../../hooks/postHooks/useSavedPosts";
import Profile from "../../components/Profile/Profile";
import useAuthStore from "../../auth/store";

const Saved = () => {
  const { user } = useAuthStore();
  const { data, error, isLoading } = useSavedPosts();

  if (error) return <p className="text-light">{error.message}</p>;
  if (isLoading) return <LoadingIndicator />;

  return (
    <Profile userName={user?.userName || ""} activeTab="saved">
      {data?.map((post) => (
        <div className="col-4 p-1" key={post.id}>
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
