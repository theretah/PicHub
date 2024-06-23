import { Link, useParams } from "react-router-dom";
import { User } from "../../auth/store";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import usePostsByAuthor from "../../hooks/postHooks/usePostsByAuthorId";
import Profile from "../../components/Profile/Profile";

const Posts = () => {
  const { userName } = useParams();
  const {
    data: posts,
    error,
    isLoading,
  } = usePostsByAuthor({ authorId: userName ? userName : "" });

  if (isLoading) return <LoadingIndicator />;

  if (error) return <p className="text-light">{error.message}</p>;

  return (
    <Profile>
      {posts?.map((post) => (
        <div className="col-4 p-1" key={post.id}>
          <Link to={`/post/${post.id}`}>
            <img
              src={`data:image/png;base64,${post.photoContent}`}
              className="img-fluid mx-auto w-100 h-100 object-fit-cover"
              alt="..."
              style={{ aspectRatio: 1 }}
            />
          </Link>
        </div>
      ))}
    </Profile>
  );
};

export default Posts;
