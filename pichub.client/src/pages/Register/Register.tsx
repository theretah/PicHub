import React from "react";

const Register = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col"></div>
        <div className="col-xl-4 col-lg-6 col-sm-12">
          <form className="border py-2 px-5 mb-3">
            <h1 className="text-center my-5">PicHub</h1>
            <p className="text-center text-gray">
              Sign up to see photos and videos from your friends.
            </p>
            <div className="mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Phone Number or Email"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                id="userName"
                placeholder="Username"
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
                Sign up
              </button>
            </div>
          </form>
          <div className="border py-3 px-5">
            <p className="text-center m-0">
              <span>Have an account? </span>
              <a href="/login" className="text-primary text-decoration-none">
                Log in
              </a>
            </p>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Register;
