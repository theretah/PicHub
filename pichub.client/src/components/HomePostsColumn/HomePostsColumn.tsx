import PostDetails from "../PostDetails/PostDetails";

const HomePostsColumn = () => {
  return (
    <>
      <div className="row mx-auto" style={{ maxWidth: 475 }}>
        {Array.from({ length: 5 }, () => (
          <div className="p-0 mb-4">
            <PostDetails />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePostsColumn;
