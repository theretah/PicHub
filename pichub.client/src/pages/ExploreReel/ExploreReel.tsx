import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import PostDetails from "../../components/PostDetails/PostDetails";
import { Post } from "../../interfaces/Post";
import usePosts from "../../hooks/postHooks/usePosts";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

const ExploreReel = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>();
  const { data, error, isLoading } = usePosts();
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
  if (isLoading) return <LoadingIndicator />;

  return (
    <Layout currentPage="Explore">
      <div className="mt-4">
        {data?.map((post) => (
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
