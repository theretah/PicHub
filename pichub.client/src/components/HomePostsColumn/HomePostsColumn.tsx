import PostDetails from "../PostDetails/PostDetails";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import usePosts from "../../hooks/postHooks/usePosts";

const HomePostsColumn = () => {
  const { data, error, isLoading } = usePosts();

  if (isLoading) return <LoadingIndicator />;

  if (error) return <p className="text-light">{error.message}</p>;

  return (
    <div className="row mx-auto mt-3" style={{ maxWidth: 475 }}>
      {data?.map((post) => (
        <div key={post.id} className="p-0 mb-4">
          <PostDetails post={post} onlyVertical={true} />
        </div>
      ))}
    </div>
  );
};

export default HomePostsColumn;
