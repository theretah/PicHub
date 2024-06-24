import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuthStore from "../../auth/store";
import { LoginData } from "../../entities/LoginData";

const Login = () => {
  const { handleSubmit, register } = useForm<LoginData>();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [error, setError] = useState<string>();

  const loginUser = useMutation({
    mutationFn: async (loginData: LoginData) => {
      const response = await login(loginData);
      if (response == "Login successful.") {
        navigate("/");
      } else {
        setError(response);
      }
    },
  });

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row d-flex justify-content-center">
        <div style={{ width: 400 }}>
          <form
            className="border py-2 px-5 mb-3 mt-5 text-bg-white"
            onSubmit={handleSubmit(async (data: LoginData) => {
              await loginUser.mutate(data);
            })}
          >
            <h1 className="text-center my-5">PicHub</h1>
            {error && (
              <div className="mb-3 bg-danger-subtle rounded p-3">
                <span className="text-danger">{error}</span>
              </div>
            )}
            <div className="mb-2">
              <input
                id="userName"
                {...register("userName", {
                  required: "Username is required.",
                })}
                type="text"
                className="form-control"
                placeholder="Phone number, username, or email"
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
                Log in
              </button>
            </div>
            <div className="mb-3">
              <button className="btn w-100">Forgot password?</button>
              <h5>Reza@16562181</h5>
            </div>
          </form>

          <div className="border py-3 px-5 text-bg-white">
            <p className="text-center m-0">
              <span>Don't have an account? </span>
              <a href="/register" className="text-primary text-decoration-none">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
