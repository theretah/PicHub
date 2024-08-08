import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import SelectProfilePictureModal from "../../components/SelectPictureModals/SelectProfilePictureModal";
import { base64ToBlob } from "../../utils/Base64ToBlob";
import SettingsLayout from "../../components/Settings/SettingsLayout";
import { EditProfileFormProps } from "../../entities/EditProfileFormProps";
import useUpdateProfile from "../../react-query/hooks/userHooks/useUpdateProfile";

const EditProfile = () => {
  const { user } = useAuthStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const updateAvatar = (imgSrc: string) => {
    setAvatar(imgSrc);
  };

  const toggleOpen = () => {
    setModalOpen(!modalOpen);
  };

  const [currentPictureSrc, setCurrentPictureSrc] = useState<string | null>(
    user?.profileImageUrl || null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileFormProps>();

  const handleDeleteFileButton = () => {
    setCurrentPictureSrc("");
    setAvatar("");

    setValue("ProfileImageFile", "");
  };

  const { mutateAsync, isSuccess } = useUpdateProfile();
  const onSubmit: SubmitHandler<EditProfileFormProps> = async (data) => {
    if (avatar) {
      const mimeType = avatar.match(/data:(.*);base64,/)?.[1] || "image/png";
      const blob = base64ToBlob(avatar, mimeType);
      const file = new File([blob], "avatar.png", { type: mimeType });
      data.ProfileImageFile = file;
    }
    const formData = new FormData();
    formData.append("UserName", data.UserName);
    formData.append("FullName", data.FullName || "");
    formData.append("Bio", data.Bio || "");
    formData.append("ProfileImageFile", data.ProfileImageFile || "");
    formData.append("Gender", data.Gender.toString() || "0");
    for (const pair of formData.entries()) {
      console.log("EditProfile.tsx: " + pair[0], pair[1]);
    }
    await mutateAsync(formData);
  };

  if (isSuccess) return <Navigate to={"/"} />;
  return (
    <SettingsLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="h4">Edit profile</span>

        <div className="mb-3 mt-3">
          <label htmlFor="fullNameInput" className="form-label h6">
            Profile photo
          </label>

          {avatar ? (
            <div className="col bg-gray rounded p-2">
              <img
                src={avatar?.toString()}
                className="mx-auto object-fit-cover rounded-circle"
                alt="..."
                style={{ width: 75, height: 75 }}
              />
              <button
                type="button"
                className="btn btn-primary ms-2 py-1"
                onClick={toggleOpen}
              >
                Change photo
              </button>
              <button
                type="button"
                className="btn text-danger fw-bold ms-2 py-1"
                onClick={handleDeleteFileButton}
              >
                Delete photo
              </button>
              <input id="file-input" type="file" hidden accept="image/*" />
            </div>
          ) : currentPictureSrc ? (
            <div className="col bg-gray rounded p-2">
              <img
                src={`data:image/png;base64,${currentPictureSrc}`}
                className="mx-auto object-fit-cover rounded-circle"
                alt="..."
                style={{ width: 75, height: 75 }}
              />
              <button
                type="button"
                className="btn btn-primary ms-2 py-1"
                onClick={toggleOpen}
              >
                Change photo
              </button>
              <button
                type="button"
                className="btn text-danger fw-bold ms-2 py-1"
                onClick={handleDeleteFileButton}
              >
                Delete photo
              </button>
              <input id="file-input" type="file" hidden accept="image/*" />
            </div>
          ) : (
            <div className="col bg-gray rounded p-2">
              <img
                src="/images/profiles/default-profile.jpg"
                className="mx-auto object-fit-cover rounded-circle"
                alt="..."
                style={{ width: 75, height: 75 }}
              />
              <button
                type="button"
                className="btn btn-primary ms-2 py-1"
                onClick={toggleOpen}
              >
                Upload photo
              </button>
              <input id="file-input" type="file" hidden accept="image/*" />
            </div>
          )}
        </div>
        {modalOpen && (
          <SelectProfilePictureModal
            modalOpen={modalOpen}
            setModalOpen={() => setModalOpen(!modalOpen)}
            updateAvatar={updateAvatar}
            closeModal={() => setModalOpen(false)}
          />
        )}
        <div className="mb-3">
          <label htmlFor="fullNameInput" className="form-label h6">
            Full name
          </label>
          <input
            type="text"
            {...register("FullName")}
            className="form-control bg-gray border-0 text-light"
            id="fullNameInput"
            placeholder="John Smith"
            defaultValue={user?.fullName}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userNameInput" className="form-label h6">
            User name
          </label>
          <input
            type="text"
            {...register("UserName", { required: "UserName is required." })}
            className="form-control bg-gray border-0 text-light"
            id="userNameInput"
            placeholder="johnsmith"
            defaultValue={user?.userName}
          />
          {errors.UserName && (
            <p className="text-danger">{errors.UserName.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="bioInput" className="form-label h6">
            Bio
          </label>
          <textarea
            {...register("Bio")}
            className="form-control bg-gray border-0 text-light"
            placeholder="Write something about yourself"
            rows={4}
            style={{ resize: "none" }}
            defaultValue={user?.bio}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="bioInput" className="form-label h6">
            Gender
          </label>
          <select
            className="form-select bg-gray border-0 text-light"
            {...register("Gender")}
            defaultValue={user?.gender}
          >
            <option value={0}>Prefer not to say</option>
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>
        <div className="mb-3 d-flex justify-content-end">
          <button className="btn btn-primary w-25" type="submit">
            Submit
          </button>
        </div>
      </form>
    </SettingsLayout>
  );
};

export default EditProfile;
