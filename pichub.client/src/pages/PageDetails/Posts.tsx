import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../interfaces/Post";
import axios from "axios";
import { User } from "../../auth/store";

interface Props {
  author: User;
}

const Posts = ({ author }: Props) => {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getPosts();
  }, [author]);

  function getPosts() {
    axios
      .get(`/api/post/getAllByAuthor?authorId=${author?.id}`)
      .then((res) => setPosts(res.data));
  }

  return posts?.map((post) => (
    <div className="col-4 p-1">
      <Link to={`/post/${post.id}`}>
        <img
          src={`data:image/png;base64,${post.photoContent}`}
          className="img-fluid mx-auto object-fit-cover"
          alt="..."
          style={{ aspectRatio: 1 }}
        />
      </Link>
    </div>
  ));
};

export default Posts;
