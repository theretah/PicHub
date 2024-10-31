import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { Link, Navigate } from "react-router-dom";
import { PostDTO } from "../../entities/PostDTO";
import useAuthStore from "../../auth/authStore";
import useDeletePost from "../../react-query/hooks/postHooks/useDeletePost";
interface PostModalProps {
  post: PostDTO;
  modalOpen: boolean;
  toggleOpen: () => void;
}
export function PostModal({ post, modalOpen, toggleOpen }: PostModalProps) {
  const { user } = useAuthStore();
  const userIsOwner = post.authorId == user?.id;
  //const {} = url;

  const deletePostMutation = useDeletePost();
  function deletePost() {
    deletePostMutation.mutate(post.id);
  }

  if (deletePostMutation.isSuccess) {
    if (window.location.href == "https://localhost:3000/") {
      window.location.reload();
    } else {
      return <Navigate to={`/${user?.userName}`} />;
    }
  }

  return (
    <MDBModal open={modalOpen} onClose={toggleOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalBody className="p-0">
            <ul className="list-group list-group-flush p-0 rounded bg-dark">
              {!userIsOwner && (
                <>
                  <li className="list-group-item align-self-center w-100 p-0">
                    <button className="btn text-danger w-100 fw-bold py-3">
                      Report
                    </button>
                  </li>
                  <li className="list-group-item align-self-center w-100 p-0">
                    <button className="btn text-danger w-100 fw-bold py-3">
                      Unfollow
                    </button>
                  </li>
                  <li className="list-group-item align-self-center w-100 p-0">
                    <button className="btn w-100 py-3">Add to favorites</button>
                  </li>
                </>
              )}

              {userIsOwner && (
                <li className="list-group-item align-self-center w-100 p-0">
                  {post && (
                    <button
                      onClick={deletePost}
                      className="btn text-danger fw-bold w-100 py-3"
                    >
                      Delete post
                    </button>
                  )}
                </li>
              )}
              <li className="list-group-item align-self-center w-100 p-0">
                {post && (
                  <Link to={`/post/${post.id}`} className="btn w-100 py-3">
                    Go to post
                  </Link>
                )}
              </li>
              <li className="list-group-item align-self-center w-100 p-0">
                <button className="btn w-100 py-3">Share to</button>
              </li>
              <li className="list-group-item align-self-center w-100 p-0">
                <button className="btn w-100 py-3">Copy link</button>
              </li>
              <li className="list-group-item align-self-center w-100 p-0">
                <button onClick={toggleOpen} className="btn w-100 py-3">
                  Cancel
                </button>
              </li>
            </ul>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

export default PostModal;
