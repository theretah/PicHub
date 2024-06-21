import PostDetails from "../../components/PostDetails/PostDetails";
import Layout from "../../components/Layout/Layout";
import "./PostDetailsPage.css";
import { Navigate, useParams } from "react-router-dom";
import useAuthStore from "../../auth/store";
import usePostById from "../../hooks/postHooks/usePostById";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore();
  const { data, error, isLoading } = usePostById({
    id: parseInt(id ? id : ""),
  });

  if (isLoading) return <LoadingIndicator />;

  if (error) return <p className="text-light">{error.message}</p>;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout currentPage="">
      <div className="mt-2">
        {id && data && <PostDetails post={data} onlyVertical={false} />}
      </div>
    </Layout>
  );
};

export default PostDetailsPage;
