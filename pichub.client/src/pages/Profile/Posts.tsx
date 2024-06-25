import { Link, Navigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Profile from "../../components/Profile/Profile";
import usePostsByAuthorUserName from "../../hooks/postHooks/usePostsByAuthorUserName";

const Posts = () => {
  const { userName } = useParams();
  if (!userName) return <Navigate to={"/"} />;
  const { data, error, isLoading } = usePostsByAuthorUserName({
    userName: userName,
  });
  const squareSize = 150;

  if (isLoading) return <LoadingIndicator />;

  if (error) return <p className="text-light">{error.message}</p>;

  return (
    <Profile userName={userName || ""} activeTab="posts">
      {data?.length != 0 ? (
        data?.map((post) => (
          <div className="col-4" style={{ padding: 0.65 }} key={post.id}>
            <Link to={`/post/${post.id}`}>
              <img
                src={`data:image/png;base64,${post.photoContent}`}
                className="img-fluid mx-auto w-100 h-100 object-fit-cover"
                alt="..."
                style={{ aspectRatio: 1 }}
              />
            </Link>
          </div>
        ))
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <div className="w-100 text-center">
            <Link to={"/createPost"} type="button" className="btn mt-1 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={squareSize}
                height={squareSize}
                fill="currentColor"
                className="bi bi-plus-square text-light"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              <p className="text-light mt-2 fs-6">Create your first post</p>
            </Link>
          </div>
        </div>
      )}
    </Profile>
  );
};

export default Posts;
