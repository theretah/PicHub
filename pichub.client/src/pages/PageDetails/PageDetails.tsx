import React, { useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";

const PageDetails = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-8">
            <div className="card mb-3 border-0">
              <div className="row g-0">
                <div className="col-md-4 d-flex justify-content-center">
                  <img
                    src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                    className="img-fluid rounded-circle align-self-center"
                    width={180}
                    height={180}
                    alt="..."
                  />
                </div>
                <div className="col-xl-8 col-md-12 col-sm-12 col-xs-12">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <h5 className="card-title d-inline m-0 me-4">username</h5>
                      {isFollowing ? (
                        <button
                          className="btn btn-secondary me-1 py-1"
                          onClick={() => setIsFollowing(!isFollowing)}
                        >
                          Following&nbsp;
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary me-1 py-1"
                          onClick={() => setIsFollowing(!isFollowing)}
                        >
                          Follow
                        </button>
                      )}
                      <button className="btn btn-secondary me-1 py-1">
                        Message
                      </button>
                      <button className="btn py-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="currentColor"
                          className="bi bi-three-dots p-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between mt-3 w-75">
                      <p className="card-title d-inline fs-6">
                        <span className="fw-bold">1,655</span> posts
                      </p>
                      <p className="card-title d-inline fs-6">
                        <span className="fw-bold">32.6M</span> followers
                      </p>
                      <p className="card-title d-inline fs-6">
                        <span className="fw-bold">8</span> following
                      </p>
                    </div>
                    <p className="card-title fw-bold mt-3">Full Name</p>
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        Followed by{" "}
                        <a href="#" className="text-decoration-none">
                          someuser
                        </a>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <a
                  className={`nav-link text-dark ${
                    activeTab === "posts" ? "active" : ""
                  }`}
                  aria-current="page"
                  onClick={() => setActiveTab("posts")}
                >
                  <span
                    className={
                      activeTab === "posts" ? "text-dark" : "text-secondary"
                    }
                  >
                    Posts
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link text-dark ${
                    activeTab === "reels" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("reels")}
                >
                  <span
                    className={
                      activeTab === "reels" ? "text-dark" : "text-secondary"
                    }
                  >
                    Reels
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link text-dark ${
                    activeTab === "tagged" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("tagged")}
                >
                  <span
                    className={
                      activeTab === "tagged" ? "text-dark" : "text-secondary"
                    }
                  >
                    Tagged
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <BottomBar />
    </>
  );
};

export default PageDetails;
