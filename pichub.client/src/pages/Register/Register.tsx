import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import { useState } from "react";
import { LoginDTO } from "../../entities/LoginDTO";

interface RegisterData {
  email: string;
  fullName: string | null;
  userName: string;
  password: string;
  accountCategoryId: number;
  professionalCategoryId: number | null;
  genderId: number;
}

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { register, handleSubmit } = useForm<RegisterData>();
  const [error, setError] = useState<string>();

  const registerUser = useMutation({
    mutationFn: async (registerData: RegisterData) => {
      axios
        .post("/api/auth/register", registerData)
        .then(() => {
          const loginData: LoginDTO = {
            userName: registerData.userName,
            password: registerData.password,
          };
          login(loginData);
          navigate("/");
        })
        .catch((e) => {
          setError(e.response.data);
        });
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    console.log(data);
    data.accountCategoryId = 1;
    data.professionalCategoryId = null;
    data.genderId = 1;
    await registerUser.mutate(data);
  };

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row d-flex justify-content-center">
        <div style={{ width: 400 }}>
          <form
            className="border py-2 px-5 mb-3 mt-5 text-bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-center my-5">PicHub</h1>
            <p className="text-center text-secondary">
              Sign up to see photos and videos from your friends.
            </p>
            {error && (
              <div className="mb-3 bg-danger-subtle rounded p-3">
                <span className="text-danger">{error}</span>
              </div>
            )}
            <div className="mb-2">
              <input
                id="email"
                {...register("email", {
                  required: "Email is required.",
                })}
                type="email"
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-2">
              <input
                id="fullName"
                {...register("fullName", {
                  required: false,
                })}
                type="text"
                className="form-control"
                placeholder="Full Name"
              />
            </div>

            <div className="mb-2">
              <input
                id="userName"
                {...register("userName", {
                  required: "Username is required.",
                })}
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>
            <div className="mb-3">
              <input
                id="password"
                {...register("password", {
                  required: "Password is required.",
                })}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary w-100" type="submit">
                Register
              </button>
              <h5>Reza@16562181</h5>
            </div>
          </form>
          <div className="border py-3 px-5 text-bg-white">
            <p className="text-center m-0">
              <span>Have an account? </span>
              <a href="/login" className="text-primary text-decoration-none">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
