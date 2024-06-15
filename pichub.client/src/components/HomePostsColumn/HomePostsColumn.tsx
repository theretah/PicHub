import { useEffect, useState } from "react";
import PostDetails from "../PostDetails/PostDetails";
import axios from "axios";
import { Post } from "../../interfaces/Post";

const HomePostsColumn = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const getAllPosts = () => {
    axios.get(`/api/post/getAll`).then((res) => {
      setAllPosts(res.data);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="row mx-auto mt-3" style={{ maxWidth: 475 }}>
      {allPosts.map((post) => (
        <div className="p-0 mb-4">
          <PostDetails
            key={post.id}
            authorId={post.authorId}
            postId={post.id}
          />
        </div>
      ))}
    </div>
  );
};

export default HomePostsColumn;
