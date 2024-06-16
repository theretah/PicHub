import PostDetails from "../../components/PostDetails/PostDetails";
import Layout from "../../components/Layout/Layout";
import "./PostDetailsPage.css";
import { Navigate, useParams } from "react-router-dom";
import useAuthStore from "../../auth/store";

const PostDetailsPage = () => {
  const { isAuthenticated } = useAuthStore();

  const { id } = useParams();

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout currentPage="">
      <div className="mt-2">{id && <PostDetails postId={parseInt(id)} />}</div>
    </Layout>
  );
};

export default PostDetailsPage;
