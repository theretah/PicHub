import { Link, Navigate, useParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Profile from "../../components/Profile/Profile";
import usePostsByAuthorUserName from "../../hooks/postHooks/usePostsByAuthorUserName";
import useAuthStore from "../../auth/authStore";

const Posts = () => {
  const { userName } = useParams();
  if (!userName) return <Navigate to={"/"} />;

  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  const { data, error, isLoading } = usePostsByAuthorUserName({
    userName: userName,
  });

  if (isLoading) return <LoadingIndicator />;
  if (error) return <p className="text-light">{error.message}</p>;

  const squareSize = 75;

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
      ) : user?.userName == userName ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="w-100 text-center">
            <Link to={"/createPost"} type="button" className="btn mt-1 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={squareSize}
                height={squareSize}
                fill="currentColor"
                className="bi bi-camera text-secondary"
                viewBox="0 0 16 16"
              >
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
              </svg>
              <h2 className="text-light mt-2 fw-bold">Share Photos</h2>
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="w-100 text-center">
            <Link to={"/createPost"} type="button" className="btn mt-1 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={squareSize}
                height={squareSize}
                fill="currentColor"
                className="bi bi-camera text-secondary"
                viewBox="0 0 16 16"
              >
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
              </svg>
              <h2 className="text-light mt-2 fw-bold">No Posts Yet</h2>
            </Link>
          </div>
        </div>
      )}
    </Profile>
  );
};

export default Posts;
