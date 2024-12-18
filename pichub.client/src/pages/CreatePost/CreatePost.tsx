import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "./CreatePost.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { base64ToBlob } from "../../utils/Base64ToBlob";
import SelectPostPictureModal from "../../components/SelectPictureModals/SelectPostPictureModal";
import { useCreatePost } from "../../react-query/hooks/PostHooks";
import { CreateEditPostDTO } from "../../entities/CreateEditPostDTO";

const CreatePost = () => {
  const { isAuthenticated, user, fetchUser } = useAuthStore();
  useEffect(() => {
    fetchUser();
  }, [isAuthenticated]);

  const [modalOpen, setModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const updateAvatar = (imgSrc: string) => {
    setAvatar(imgSrc);
  };

  const toggleOpen = () => {
    setModalOpen(!modalOpen);
  };

  const navigate = useNavigate();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { register, handleSubmit } = useForm<CreateEditPostDTO>();

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

  // const addPost = useMutation({
  //   mutationFn: async (post: CreatePostProps) => {
  //     const formData = new FormData();
  //     formData.append("ImageFile", post.ImageFile);
  //     formData.append("Caption", post.Caption);
  //     formData.append("TurnOffComments", post.TurnOffComments);

  //     axios
  //       .post(`/api/posts`, formData, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       })
  //       .then((res) => {
  //         if (res.status == 200) navigate("/");
  //       })
  //       .catch((error) => {
  //         throw new Error(error);
  //       });
  //   },
  // });

  const createPostMutation = useCreatePost();
  const onSubmit: SubmitHandler<CreateEditPostDTO> = async (data) => {
    if (avatar) {
      const mimeType = avatar.match(/data:(.*);base64,/)?.[1] || "image/png";
      const blob = base64ToBlob(avatar, mimeType);
      const file = new File([blob], "avatar.png", { type: mimeType });
      data.imageFile = file;
    }
    try {
      const response = await createPostMutation.mutateAsync(data);
      if (response.status == 200) navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Layout currentPage="Create">
      <div
        className={`mx-auto mt-3 shadow-lg ${
          isSmallScreen ? "p-1" : "p-0 border border-secondary"
        }`}
        style={!isSmallScreen ? { width: 730, height: 487 } : {}}
      >
        <form
          className={`${isSmallScreen ? "w-100" : "row h-100"} g-0`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {isSmallScreen && (
            <div className="mb-2">
              <ProfileImage user={user} widthHeight={30} />
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
            {avatar ? (
              <button type="button" className="btn p-0" onClick={toggleOpen}>
                <img
                  src={avatar}
                  className="mx-auto object-fit-contain"
                  alt="..."
                  style={{ width: "100%", height: "100%" }}
                />
              </button>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <div className="w-100 text-center">
                  <button
                    type="button"
                    className="btn mt-1 py-1"
                    onClick={toggleOpen}
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
                </div>
              </div>
            )}
            {modalOpen && (
              <SelectPostPictureModal
                modalOpen={modalOpen}
                setModalOpen={() => setModalOpen(!modalOpen)}
                updateAvatar={updateAvatar}
                closeModal={() => setModalOpen(false)}
              />
            )}
          </div>
          <div className={`${isSmallScreen ? "row" : "col"} p-2`}>
            <div className="card-body bg-dark text-light border-0">
              {!isSmallScreen && (
                <div>
                  <ProfileImage user={user} widthHeight={30} />
                  &nbsp;
                  <span className="fw-bold align-self-center">
                    {user?.userName}
                  </span>
                </div>
              )}
              <div className="overflow-y-auto mt-2" style={{ height: 265 }}>
                <textarea
                  id="caption"
                  {...register("caption", { required: false })}
                  className="form-control h-100 border-0 text-light bg-gray"
                  placeholder="Write a caption..."
                ></textarea>
              </div>
              <div className="mt-2">
                <select
                  defaultValue={0}
                  className="form-select bg-gray text-light border-0"
                >
                  <option value={0}>Add location</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
              </div>
              <div className="mt-2">
                <div className="d-flex justify-content-between form-check form-switch ps-0">
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Comments are allowed
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    {...register("commentsAllowed")}
                    defaultChecked={true}
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
