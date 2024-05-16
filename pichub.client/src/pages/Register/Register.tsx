import React, { useEffect, useState } from "react";

const Register = () => {
  const sm = 576;
  const md = 768;
  const lg = 992;
  const xl = 1200;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  return (
    <div className="container-fluid bg-white min-vh-100">
      <div className="row d-flex justify-content-center">
        <div style={{ width: 400 }}>
          <form className="border py-2 px-5 mb-3 mt-5 text-bg-white">
            <h1 className="text-center my-5">PicHub</h1>
            <p className="text-center text-secondary">
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
                Next
              </button>
            </div>
          </form>
          <div className="border py-3 px-5  text-bg-white">
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
