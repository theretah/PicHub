import PostDetails from "../PostDetails/PostDetails";

const HomePostsColumn = () => {
  let i = 0;
  return (
    <div className="row mx-auto" style={{ maxWidth: 475 }}>
      {Array.from({ length: 5 }, () => (
        <div className="p-0 mb-4">
          <PostDetails key={i++} />
        </div>
      ))}
    </div>
  );
};

export default HomePostsColumn;
