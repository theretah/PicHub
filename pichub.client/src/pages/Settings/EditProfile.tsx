import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../auth/store";
import { Props } from "./Props";

interface EditProfileFormProps {
  FullName: string;
  UserName: string;
  Bio: string;
  ProfileImageFile: File | string | null;
  Gender: string;
}

const EditProfile = ({ width }: Props) => {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const [selectedPictureSrc, setSelectedPictureSrc] = useState<
    string | ArrayBuffer | null
  >();
  const [currentPictureSrc, setCurrentPictureSrc] = useState<string | null>(
    user?.profileImageUrl || null
  );

  const { register, handleSubmit, setValue } = useForm<EditProfileFormProps>();

  const handleSelectFileButton = () => {
    document.getElementById("file-input")?.click();
  };

  const handleDeleteFileButton = () => {
    setSelectedPictureSrc(null);
    setCurrentPictureSrc("");

    setValue("ProfileImageFile", "");
  };

  function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files ? event.target.files[0] : null;
    setValue("ProfileImageFile", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPictureSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const onSubmit: SubmitHandler<EditProfileFormProps> = async (data) => {
    await editProfile.mutate(data);
  };

  const editProfile = useMutation({
    mutationFn: async (model: EditProfileFormProps) => {
      const formData = new FormData();

      formData.append(
        "ProfileImageFile",
        model.ProfileImageFile ? model.ProfileImageFile : ""
      );
      formData.append("FullName", model.FullName);
      formData.append("UserName", model.UserName);
      formData.append("Bio", model.Bio);
      formData.append("Gender", model.Gender);
      axios
        .put(`/api/user/update`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          console.log(model);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={width}>
      <span className="h4">Edit profile</span>

      <div className="mb-3 mt-3">
        <label htmlFor="fullNameInput" className="form-label h6">
          Profile photo
        </label>

        {selectedPictureSrc ? (
          <div className="col bg-gray rounded p-2">
            <img
              src={selectedPictureSrc?.toString()}
              className="mx-auto object-fit-cover rounded-circle"
              alt="..."
              style={{ width: 75, height: 75 }}
            />
            <button
              type="button"
              className="btn btn-primary ms-2 py-1"
              onClick={handleSelectFileButton}
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
            <input
              id="file-input"
              type="file"
              hidden
              accept="image/*"
              onInput={handleFileInput}
            />
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
              onClick={handleSelectFileButton}
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
            <input
              id="file-input"
              type="file"
              hidden
              accept="image/*"
              onInput={handleFileInput}
            />
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
              onClick={handleSelectFileButton}
            >
              Upload photo
            </button>
            <input
              id="file-input"
              type="file"
              hidden
              accept="image/*"
              onInput={handleFileInput}
            />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="fullNameInput" className="form-label h6">
          Full name
        </label>
        <input
          {...register("FullName")}
          type="text"
          className="form-control bg-gray border-0 text-light"
          id="fullNameInput"
          placeholder="John Smith"
          defaultValue={user?.fullName}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="userNameInput" className="form-label h6">
          Username
        </label>
        <input
          {...register("UserName")}
          type="text"
          className="form-control bg-gray border-0 text-light"
          id="userNameInput"
          placeholder="johnsmith"
          defaultValue={user?.userName}
        />
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
  );
};

export default EditProfile;
