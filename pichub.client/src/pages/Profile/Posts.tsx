import { Link } from "react-router-dom";
import { User } from "../../auth/store";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import usePostsByAuthor from "../../hooks/postHooks/usePostsByAuthor";

interface Props {
  author: User;
}

const Posts = ({ author }: Props) => {
  const {
    data: posts,
    error,
    isLoading,
  } = usePostsByAuthor({ authorId: author.id });

  if (isLoading) return <LoadingIndicator />;

  if (error) return <p className="text-light">{error.message}</p>;

  return posts?.map((post) => (
    <div className="col-4 p-1">
      <Link to={`/post/${post.id}`}>
        <img
          src={`data:image/png;base64,${post.photoContent}`}
          className="img-fluid mx-auto w-100 h-100 object-fit-cover"
          alt="..."
          style={{ aspectRatio: 1 }}
        />
      </Link>
    </div>
  ));
};

export default Posts;
