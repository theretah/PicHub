import AuthContext, {
  LoginData,
  RegisterData,
} from "../../context/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<RegisterData>();

  const registerUser = useMutation({
    mutationFn: async (registerData: RegisterData) => {
      axios.post("/api/account/register", registerData);

      const loginData: LoginData = {
        userName: registerData.userName,
        password: registerData.password,
      };
      axios.post("/api/account/login", loginData);
      login(loginData);
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    await registerUser.mutate(data);
    alert(`${data.userName} registered successfully!`);
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
            <div className="mb-2">
              <input
                id="email"
                {...register("email", {
                  required: "Email is required.",
                })}
                type="email"
                className="form-control"
                placeholder="Phone Number or Email"
              />
            </div>
            <div className="mb-2">
              <input
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required.",
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
