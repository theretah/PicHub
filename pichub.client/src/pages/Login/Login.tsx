import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useFormAction } from "react-router-dom";

const Login = () => {
  const context = useContext(AuthContext);

  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row d-flex justify-content-center">
        <div style={{ width: 400 }}>
          <form className="border py-2 px-5 mb-3 mt-5 text-bg-white">
            <h1 className="text-center my-5">PicHub</h1>
            <div className="mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Phone number, username, or email"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary w-100" disabled={true}>
                Log in
              </button>
            </div>
            <div className="mb-3">
              <button className="btn w-100">Forgot password?</button>
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
