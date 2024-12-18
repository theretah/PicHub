import PostDetails from "../../components/PostDetails/PostDetails";
import Layout from "../../components/Layout/Layout";
import "./PostDetailsPage.css";
import { Navigate, useParams } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { usePostById } from "../../react-query/hooks/PostHooks";

const PostDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuthStore();
  const { data, error, isLoading } = usePostById(
    parseInt(id ?? ""),
    id != undefined && id != null
  );

  if (isLoading)
    return (
      <Layout currentPage="post">
        <LoadingIndicator />
      </Layout>
    );

  if (error) return <p className="text-light">{error.message}</p>;

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout currentPage="">
      <div className="mt-2">
        {data && <PostDetails key={data.id} post={data} onlyVertical={false} />}
      </div>
    </Layout>
  );
};

export default PostDetailsPage;
