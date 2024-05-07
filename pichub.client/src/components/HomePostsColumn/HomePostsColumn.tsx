import PostDetails from "../PostDetails/PostDetails";

const HomePostsColumn = () => {
  return (
    <>
      <div className="row mx-auto" style={{ maxWidth: 475 }}>
        {Array.from({ length: 5 }, () => (
          <div>
            <PostDetails />
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePostsColumn;
