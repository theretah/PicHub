import React from "react";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col"></div>
          <div className="col-xl-4 col-sm-8">
            <form className="border py-2 px-5 mb-3">
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
            <div className="border py-3 px-5">
              <p className="text-center m-0">
                <span>Don't have an account? </span>
                <a
                  href="/register"
                  className="text-primary text-decoration-none"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
