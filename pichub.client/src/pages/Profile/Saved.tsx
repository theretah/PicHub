import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../auth/store";
import { Post } from "../../interfaces/Post";

interface Props {
  user: User;
}

const Saved = ({ user }: Props) => {
  const [savedPosts, setSavedPosts] = useState<Post[]>();

  useEffect(() => {
    getSavedPosts();
  }, [user]);

  function getSavedPosts() {
    axios
      .get(`/api/post/getSavedPosts?userId=${user?.id}`)
      .then((res) => setSavedPosts(res.data));
  }

  return savedPosts?.map((post) => (
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

export default Saved;
