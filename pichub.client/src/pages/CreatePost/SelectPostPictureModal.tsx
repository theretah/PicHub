import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalHeader,
} from "mdb-react-ui-kit";
import ImageCropper from "./ImageCropper";
import { Props } from "./Props";

const SelectPostPictureModal = ({
  updateAvatar,
  closeModal,
  modalOpen,
  setModalOpen,
}: Props) => {
  return (
    <MDBModal open={modalOpen} onClose={setModalOpen} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent
          className="mx-auto rounded-5"
          style={{ width: 500, height: 600 }}
        >
          <MDBModalHeader className="bg-dark text-light d-flex justify-content-between border-gray py-1">
            <span className="h5 m-0">Select picture file</span>
            <button
              type="button"
              className="btn btn-dark p-0"
              onClick={closeModal}
              style={{ width: 30, height: 30 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </MDBModalHeader>
          <MDBModalBody className="p-0 bg-dark">
            <div className="container mt-3">
              <div className="row mt-auto">
                <div className="col d-flex justify-content-between">
                  <div className="w-100">
                    <ImageCropper
                      circularCrop={false}
                      updateAvatar={updateAvatar}
                      closeModal={closeModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default SelectPostPictureModal;
