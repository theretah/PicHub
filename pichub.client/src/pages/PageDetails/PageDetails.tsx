import { useEffect, useState } from "react";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import Layout from "../../components/Layout/Layout";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import Posts from "./Posts";
import Reels from "./Reels";
import Tagged from "./Tagged";
import Saved from "./Saved";
import axios from "axios";
import useAuthStore, { User } from "../../auth/store";

const EditProfileButton = () => {
  return (
    <Link className="btn btn-secondary me-1 py-1 ms-auto" to={"/settings"}>
      Edit Profile
    </Link>
  );
};
const MessageButton = () => {
  return <button className="btn btn-secondary me-1 py-1">Message</button>;
};

interface FollowButtonProps {
  isFollowing: boolean;
  follow: () => void;
  unFollow: () => void;
}

const FollowButton = ({ follow, unFollow, isFollowing }: FollowButtonProps) => {
  return isFollowing ? (
    <button className="btn btn-secondary me-1 py-1" onClick={unFollow}>
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
    <button className="btn btn-primary me-1 py-1" onClick={follow}>
      Follow
    </button>
  );
};

const PageDetails = () => {
  const { id } = useParams();
  const [pageUser, setPageUser] = useState<User>();
  const { user, isAuthenticated, fetchUser } = useAuthStore();

  const [userIsOwner, setUserIsOwner] = useState(pageUser?.id == user?.id);

  const md = 768;
  const sm = 576;
  const fontSize = 12;
  const [isFollowing, setIsFollowing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMedium, setIsMedium] = useState(window.innerWidth < md);
  const [isExtraSmall, setIsExtraSmall] = useState(window.innerWidth < sm);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMedium(windowWidth < md);
      setIsExtraSmall(windowWidth < sm);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    getPageUser();
  }, [id]);

  const getPageUser = async () => {
    await axios
      .get(`/api/account/getbyusername?userName=${id}`)
      .then((res) => {
        setPageUser(res.data);
        setUserIsOwner(res.data.id == user?.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      {isMedium && (
        <div className="container-fluid border-bottom border-gray">
          <div className="d-flex justify-content-between py-1">
            <Link to={"/settings"} className="btn btn-dark text-light px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                className="bi bi-gear-wide"
                viewBox="0 0 16 16"
              >
                <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
              </svg>
            </Link>
            <Link to={"/login"} className="btn btn-dark text-light">
              {pageUser?.userName} &nbsp;
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
            </Link>
          </div>
        </div>
      )}

      <Layout currentPage="Profile">
        <div
          className={`container-fluid ${windowWidth >= md ? "mt-5" : "mt-3"}`}
        >
          <div className="row">
            <div className="col"></div>
            <div className="col-xl-10 col-lg-12 col-md-12 p-0">
              <div className="mb-3 border-0 text-bg-dark">
                <div className="row g-0">
                  <div
                    className={`d-flex ${
                      isMedium
                        ? "row"
                        : "col-xl-4 col-md-4 col-sm-4 col-4 justify-content-center"
                    }`}
                  >
                    <div
                      className={`col-md-3 col-sm-3 col-3 align-self-center p-0`}
                      style={windowWidth >= md ? { width: 180 } : {}}
                    >
                      <ProfileImage
                        imageUrl={
                          pageUser?.profileImageUrl
                            ? `data:image/png;base64,${pageUser.profileImageUrl}`
                            : "../../../images/profiles/default-profile.jpg"
                        }
                        widthHeight={isExtraSmall ? 75 : isMedium ? 100 : 180}
                      />
                    </div>
                    {isMedium && (
                      <div
                        className="col-md-9 col-sm-9 col-9 p-0"
                        style={
                          windowWidth >= md ? { width: windowWidth - 180 } : {}
                        }
                      >
                        <div className="row">
                          <div className="row mt-2">
                            <div className="col d-flex align-items-center">
                              <span className="h5 m-0 me-4">
                                {pageUser?.userName}
                              </span>
                              {userIsOwner ? (
                                <EditProfileButton />
                              ) : (
                                <>
                                  <FollowButton
                                    follow={() => setIsFollowing(true)}
                                    unFollow={() => setIsFollowing(false)}
                                    isFollowing={isFollowing}
                                  />
                                  <MessageButton />
                                </>
                              )}

                              <button className="btn text-light py-1 px-0">
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
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`${
                      isMedium ? "row mt-3" : "col-xl-8 col-md-8 col-sm-8 col-8"
                    }`}
                  >
                    <div className="p-0">
                      <div className="row d-flex align-items-center">
                        {windowWidth > 768 && (
                          <div className="col-sm-4 col-md-4">
                            <h5 className="d-inline m-0 me-4">
                              {pageUser?.userName}
                            </h5>
                          </div>
                        )}

                        {windowWidth >= md && (
                          <div className="col-sm-8 col-md-8">
                            {userIsOwner ? (
                              <EditProfileButton />
                            ) : (
                              <>
                                <FollowButton
                                  follow={() => setIsFollowing(true)}
                                  unFollow={() => setIsFollowing(false)}
                                  isFollowing={isFollowing}
                                />
                                <MessageButton />
                              </>
                            )}

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
                        )}
                      </div>
                      <div
                        className={`d-flex justify-content-between mt-3 ${
                          windowWidth > 768 ? "w-75" : ""
                        }`}
                      >
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

                      <p className="fw-bold mb-0 mt-3">{pageUser?.fullName}</p>

                      <p className="my-0 text-light text-gray">
                        Personal account
                      </p>
                      <p className="card-text my-0">
                        This is a wider card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                      <p className="card-text">
                        <small className="text-gray">Followed by</small>
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
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "posts"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    onClick={() => setActiveTab("posts")}
                    style={{ fontSize: fontSize }}
                  >
                    <span>
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
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "reels"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    onClick={() => setActiveTab("reels")}
                    style={{ fontSize: fontSize }}
                  >
                    <span>
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
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "tagged"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    onClick={() => setActiveTab("tagged")}
                    style={{ fontSize: fontSize }}
                  >
                    <span>
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
                      activeTab === "saved"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    onClick={() => setActiveTab("saved")}
                    style={{ fontSize: fontSize }}
                  >
                    <span>
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
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col"></div>
            <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                {activeTab == "posts" && pageUser ? (
                  <Posts author={pageUser} />
                ) : activeTab == "reels" ? (
                  <Reels />
                ) : activeTab == "tagged" ? (
                  <Tagged />
                ) : (
                  pageUser && <Saved user={pageUser} />
                )}
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PageDetails;
