import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import ChatButton from "../../components/PostControlButtons/ChatButton";
import LikeButton from "../../components/PostControlButtons/LikeButton";
import SaveButton from "../../components/PostControlButtons/SaveButton";
import ShareButton from "../../components/PostControlButtons/ShareButton";
import PostDetails from "../../components/PostDetails/PostDetails";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { Post } from "../../interfaces/Post";
import axios from "axios";
import PostDetailsHorizontal from "../../components/PostDetails/PostDetailsHorizontal";

const ExploreReel = () => {
  const [posts, setPosts] = useState<Post[]>();
  const [isSmallScreen, setIsSmallScreen] = useState<Boolean>();

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
      {posts?.map((post) => (
        <div className="mt-2">
          {isSmallScreen ? (
            <div className="row mx-auto">
              <PostDetails authorId={post.authorId} postId={post.id} />
            </div>
          ) : (
            <div
              className="mx-auto mt-3 shadow-lg border border-secondary"
              style={{ width: 802, height: 502 }}
            >
              <PostDetailsHorizontal
                authorId={post.authorId}
                postId={post.id}
              />
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default ExploreReel;
