import { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./CreatePost.css";

import ProfileImage from "../../components/ProfileImage/ProfileImage";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../../context/AuthContext";
import { useAuth } from "../../context/useAuth";

interface CreatePostProps {
  Caption: string;
  TurnOffComments: string;
  ImageFile: File;
}
const CreatePost = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);
  const [selectedPictureSrc, setSelectedPictureSrc] = useState<
    string | ArrayBuffer | null
  >();

  const { register, handleSubmit, setValue } = useForm<CreatePostProps>();

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

  const handleSelectFileButton = () => {
    document.getElementById("file-input")?.click();
  };

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedPicture(file);
    if (file) {
      setValue("ImageFile", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPictureSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const addPost = useMutation({
    mutationFn: async (post: CreatePostProps) => {
      const formData = new FormData();
      formData.append("ImageFile", post.ImageFile);
      formData.append("Caption", post.Caption);
      formData.append("TurnOffComments", post.TurnOffComments);

      axios
        .post(`/api/post/create`, formData)
        .then((res) => {
          if (res.status == 200) navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const onSubmit: SubmitHandler<CreatePostProps> = async (data) => {
    await addPost.mutate(data);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout currentPage="Create">
      <div
        className={`mx-auto mt-3 shadow-lg ${
          isSmallScreen ? "p-1" : "p-0 border border-secondary rounded"
        }`}
        style={!isSmallScreen ? { width: 802, height: 487 } : {}}
      >
        <form
          className={`${isSmallScreen ? "w-100" : "row h-100"} g-0`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {isSmallScreen && (
            <div className="mb-2">
              <ProfileImage
                imageUrl={"../../../public/images/profiles/square.png"}
                widthHeight={30}
              />
              &nbsp;
              <span className="fw-bold align-self-center text-light">
                {user?.userName}
              </span>
            </div>
          )}
          <div
            className={`${
              isSmallScreen ? "row" : "col-8 border-end border-secondary h-100"
            } d-flex justify-content-center`}
          >
            {selectedPicture ? (
              <>
                <button
                  type="button"
                  className="btn"
                  onClick={handleSelectFileButton}
                >
                  <img
                    src={selectedPictureSrc?.toString()}
                    className="mx-auto object-fit-contain"
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
                <input
                  id="file-input"
                  type="file"
                  hidden
                  accept="image/*"
                  onInput={handleFileInput}
                />
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-100 text-center">
                  <button
                    type="button"
                    className="btn mt-1 py-1"
                    onClick={handleSelectFileButton}
                  >
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
                    <span className="btn btn-primary">
                      Select from computer
                    </span>
                  </button>
                  <input
                    id="file-input"
                    type="file"
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
              {!isSmallScreen && (
                <div>
                  <ProfileImage
                    imageUrl={"../../../public/images/profiles/square.png"}
                    widthHeight={30}
                  />
                  &nbsp;
                  <span className="fw-bold align-self-center">
                    {user?.userName}
                  </span>
                </div>
              )}
              <div className="overflow-y-auto mt-2" style={{ height: 265 }}>
                <textarea
                  id="caption"
                  {...register("Caption")}
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
                    {...register("TurnOffComments")}
                  />
                </div>
                <p className="text-gray" style={{ fontSize: 12 }}>
                  You can change this later by going to the ··· menu at the top
                  of your post.
                </p>
              </div>
              <div className="mt-2 d-flex justify-content-end">
                <button className="btn btn-primary py-1" type="submit">
                  Share
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
