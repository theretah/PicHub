import Layout from "../../components/Layout/Layout";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import PostDetails from "../../components/PostDetails/PostDetails";
import { usePosts } from "../../react-query/hooks/PostHooks";

const ExploreReel = () => {
  const { data, isLoading } = usePosts();

  if (isLoading)
    return (
      <Layout currentPage="explore">
        <LoadingIndicator />
      </Layout>
    );

  return (
    <Layout currentPage="Explore">
      <div className="mt-4">
        {data?.map((post) => (
          <div key={post.id} className="p-0 mb-4">
            <PostDetails key={post.id} post={post} onlyVertical={false} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ExploreReel;
