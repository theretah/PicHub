import React, { useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { Link } from "react-router-dom";

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
                  <div className="align-self-center">
                    <ProfileImage
                      imageUrl={
                        "../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                      }
                      widthHeight={180}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-md-12 col-sm-12">
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
                    <p className="card-title fw-bold mb-0 mt-3">Full Name</p>
                    <p className="card-text my-0 opacity-75">
                      Personal account
                    </p>
                    <p className="card-text my-0">
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
                <button
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      className="bi bi-list"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                      />
                    </svg>
                    &nbsp; POSTS
                  </span>
                </button>
              </li>
              <li className="nav-item">
                <button
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-film"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg>
                    &nbsp; REELS
                  </span>
                </button>
              </li>
              <li className="nav-item">
                <button
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-file-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    &nbsp; TAGGED
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-lg-2 col-md-0 col-sm-0"></div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="row">
              {Array.from({ length: 7 }, () => (
                <div className="col-4 p-1">
                  <Link to={"/post"}>
                    <img
                      className="w-100"
                      src="../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                      alt=""
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-2 col-md-0 col-sm-0"></div>
        </div>
      </div>
      <BottomBar currentPage="profile" />
    </>
  );
};

export default PageDetails;
