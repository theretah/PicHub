import React, { useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const PageDetails = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const fontSize = 14;
  return (
    <Layout currentPage="profile">
      <div className="container">
        <div className="row">
          <div className="col"></div>
          <div className="col-md-12 col-lg-8 p-0">
            <div className="mb-3 border-0 text-bg-dark">
              <div className="row g-0">
                <div className="col-md-4 col-sm-2 d-flex justify-content-center">
                  <div className="align-self-center">
                    <ProfileImage
                      imageUrl={
                        "../../../public/images/profiles/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.png"
                      }
                      widthHeight={180}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-md-12 col-sm-10">
                  <div className="">
                    <div className="d-flex align-items-center">
                      <h5 className=" d-inline m-0 me-4">username</h5>
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
                      <button className="btn text-light py-1">
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
                        <span className="fw-bold">1,655</span> Posts
                      </p>
                      <p className="card-title d-inline fs-6">
                        <span className="fw-bold">32.6M</span> Followers
                      </p>
                      <p className="card-title d-inline fs-6">
                        <span className="fw-bold">8</span> Following
                      </p>
                    </div>
                    <p className="fw-bold mb-0 mt-3">Full Name</p>
                    <p className="my-0 text-light opacity-75">
                      Personal account
                    </p>
                    <p className="card-text my-0">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <p className="card-text">
                      <small className="text-light" style={{ opacity: "75%" }}>
                        Followed by
                      </small>
                      <a
                        href="#"
                        className="text-decoration-none text-light fw-bold"
                      >
                        &nbsp;someuser
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ul className="nav nav-underline justify-content-center">
              <button className="btn">
                <a
                  className={`nav-link ${
                    activeTab === "posts" ? "border-bottom" : "opacity-75"
                  }`}
                  onClick={() => setActiveTab("posts")}
                  style={{ fontSize: fontSize }}
                >
                  <span className={`text-light`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
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
                </a>
              </button>
              <button className="btn">
                <a
                  className={`nav-link ${
                    activeTab === "reels" ? "border-bottom" : "opacity-75"
                  }`}
                  onClick={() => setActiveTab("reels")}
                  style={{ fontSize: fontSize }}
                >
                  <span className={`text-light`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-film"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg>
                    &nbsp; REELS
                  </span>
                </a>
              </button>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "tagged" ? "border-bottom" : "opacity-75"
                  }`}
                  onClick={() => setActiveTab("tagged")}
                  style={{ fontSize: fontSize }}
                >
                  <span className={`text-light`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-person-badge"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                      <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                    </svg>
                    &nbsp; TAGGED
                  </span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "saved" ? "border-bottom" : "opacity-75"
                  }`}
                  onClick={() => setActiveTab("saved")}
                  style={{ fontSize: fontSize }}
                >
                  <span className={`text-light`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-save"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
                    </svg>
                    &nbsp; SAVED
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
    </Layout>
  );
};

export default PageDetails;
