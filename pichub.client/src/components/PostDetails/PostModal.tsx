import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Post } from "../../entities/Post";
interface PostModalProps {
  post: Post;
  modalOpen: boolean;
  toggleOpen: () => void;
}
export function PostModal({ post, modalOpen, toggleOpen }: PostModalProps) {
  return (
    <MDBModal open={modalOpen} onClose={toggleOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalBody className="p-0">
            <ul className="list-group list-group-flush p-0 rounded bg-dark">
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
