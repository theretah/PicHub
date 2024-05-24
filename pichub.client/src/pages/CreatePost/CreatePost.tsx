import { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./CreatePost.css";

import ProfileImage from "../../components/ProfileImage/ProfileImage";

const CreatePost = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [selectedPictureSrc, setSelectedPictureSrc] = useState<
    string | null | ArrayBuffer
  >(``);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 900);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleSelectFileButton() {
    fileInputRef.current?.click();
  }

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedPicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPictureSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Layout currentPage="Create">
      <div
        className={`mx-auto mt-3 shadow-lg ${
          isSmallScreen ? "p-3" : "p-0 border border-secondary rounded"
        }`}
        style={!isSmallScreen ? { width: 802, height: 487 } : {}}
      >
        <div className={`${isSmallScreen ? "w-100" : "row h-100"} g-0`}>
          <div
            className={`${
              isSmallScreen ? "row mb-4" : "col-8 border-end border-secondary"
            } d-flex justify-content-center`}
          >
            {selectedPicture ? (
              <img
                src={selectedPictureSrc?.toString()}
                className="img-fluid mx-auto object-fit-cover"
                alt="..."
              />
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-100 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={isSmallScreen ? "200" : "96"}
                    height={isSmallScreen ? "200" : "96"}
                    fill="currentColor"
                    className="bi bi-image text-light"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                  </svg>
                  <p className="text-light mt-2 fs-5">Drag photos here</p>
                  <button
                    className="btn btn-primary mt-1 py-1"
                    onClick={handleSelectFileButton}
                  >
                    Select from computer
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onInput={handleFileInput}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={`${isSmallScreen ? "row" : "col"} p-2`}>
            <div className="card-body bg-dark text-light border-0">
              <div className="">
                <ProfileImage
                  imageUrl={"../../../public/images/profiles/square.png"}
                  widthHeight={30}
                />
                &nbsp;
                <span className="fw-bold align-self-center">username</span>
              </div>
              <div className="overflow-y-auto mt-2" style={{ height: 265 }}>
                <textarea
                  className="form-control h-100 border-0 text-light bg-gray"
                  placeholder="Write a caption..."
                ></textarea>
              </div>
              <div className="mt-2">
                <select className="form-select bg-gray text-light border-0">
                  <option selected>Add location</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between form-check form-switch ps-0">
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Turn off commenting
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                </div>
                <p className="text-gray" style={{ fontSize: 12 }}>
                  You can change this later by going to the ··· menu at the top
                  of your post.
                </p>
              </div>
              <div className="mt-2 d-flex justify-content-end">
                <button className="btn btn-primary py-1">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePost;
