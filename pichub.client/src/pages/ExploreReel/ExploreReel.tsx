import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import PostDetails from "../../components/PostDetails/PostDetails";
import { Post } from "../../interfaces/Post";

const ExploreReel = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>();

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    axios.get(`/api/post/getAll`).then((res) => {
      setPosts(res.data);
    });
  }
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout currentPage="Explore">
      <div className="mt-4">
        {posts?.map((post) => (
          <div key={post.id} className="p-0 mb-4">
            <PostDetails
              key={post.id}
              post={post}
              onlyVertical={isSmallScreen || false}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ExploreReel;
