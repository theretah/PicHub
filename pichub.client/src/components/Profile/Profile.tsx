import { ReactNode, useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import Layout from "../Layout/Layout";
import { Link, Navigate } from "react-router-dom";

import useAuthStore from "../../auth/authStore";
import useUserByUserName from "../../hooks/accountHooks/useUserByUserName";
import usePostsCount from "../../hooks/userHooks/usePostsCount";
import useFollowersCount from "../../hooks/userHooks/useFollowersCount";
import useFollowingsCount from "../../hooks/userHooks/useFollowingsCount";
import useIsFollowing from "../../hooks/userHooks/useIsFollowing";
import useFollow from "../../hooks/userHooks/useFollow";
import useUnfollow from "../../hooks/userHooks/useUnfollow";
import EditProfileButton from "./Buttons/EditProfileButton";
import FollowButton from "./Buttons/FollowButton";
import MessageButton from "./Buttons/MessageButton";
import MoreButton from "./Buttons/MoreButton";
import SettingsButton from "./Buttons/SettingsButton";

interface Props {
  userName: string;
  children: ReactNode;
  activeTab: string;
}
const Profile = ({ userName, children, activeTab }: Props) => {
  const { user, isAuthenticated } = useAuthStore();

  const { data: pageUser, isSuccess } = useUserByUserName({
    userName: userName,
  });

  const userIsPageOwner = userName == user?.userName;

  const { data: postsCount } = usePostsCount({
    userName: userName,
    enabled: isSuccess,
  });

  const { data: followersCount } = useFollowersCount({
    userId: pageUser?.id || "",
    enabled: isSuccess,
  });

  const { data: followingsCount } = useFollowingsCount({
    userId: pageUser?.id || "",
    enabled: isSuccess,
  });

  const { data: isFollowing } = useIsFollowing({
    followingId: pageUser?.id || "",
    enabled: isSuccess,
  });

  const [isFollowingState, setIsFollowingState] = useState<boolean>(
    isFollowing || false
  );
  const [followersCountState, setFollowersCountState] = useState<number>(
    followersCount || 0
  );
  const [followingsCountState, setFollowingsCountState] = useState<number>(
    followingsCount || 0
  );

  useEffect(() => {
    if (isFollowing != undefined) setIsFollowingState(isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    if (followersCount != undefined && followingsCount != undefined) {
      setFollowersCountState(followersCount);
      setFollowingsCountState(followingsCount);
    }
  }, [followersCount, followingsCount]);

  const follow = useFollow({ followingId: pageUser?.id || "" });
  async function followUser() {
    follow.mutateAsync();
    setIsFollowingState(true);
    setFollowersCountState(followersCountState + 1);
  }

  const unFollow = useUnfollow({ followingId: pageUser?.id || "" });
  async function unFollowUser() {
    unFollow.mutateAsync();
    setIsFollowingState(false);
    setFollowersCountState(followersCountState - 1);
  }

  const md = 768;
  const sm = 576;
  const fontSize = 12;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMedium, setIsMedium] = useState(window.innerWidth < md);
  const [isExtraSmall, setIsExtraSmall] = useState(window.innerWidth < sm);

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

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      {isMedium && userIsPageOwner && (
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
              {user?.userName} &nbsp;
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
                <div className="w-100 g-0 ">
                  <div className="row">
                    <div
                      className={`d-flex ${
                        isMedium
                          ? ""
                          : "col-xl-3 col-md-3 col-sm-3 col-3 justify-content-center"
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
                          widthHeight={isExtraSmall ? 75 : isMedium ? 100 : 150}
                        />
                      </div>
                      {isMedium && (
                        <div
                          className="col-md-9 col-sm-9 col-9 p-0"
                          style={
                            windowWidth >= md
                              ? { width: windowWidth - 180 }
                              : {}
                          }
                        >
                          <div className="row">
                            <div className="row mt-2 w-100">
                              <div className="col d-flex align-items-center justify-content-between">
                                <span className="h5 m-0 me-4 ">
                                  {pageUser?.userName}
                                </span>
                                {userIsPageOwner ? (
                                  <>
                                    <EditProfileButton />
                                    <SettingsButton />
                                  </>
                                ) : (
                                  <>
                                    <FollowButton
                                      follow={() => {
                                        setIsFollowingState(true);
                                        followUser();
                                      }}
                                      unFollow={() => {
                                        setIsFollowingState(false);
                                        unFollowUser();
                                      }}
                                      isFollowing={isFollowingState}
                                    />
                                    <MessageButton
                                      userName={pageUser?.userName || ""}
                                    />
                                    <MoreButton />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className={`${
                        isMedium
                          ? "w-100 mt-3"
                          : "col-xl-8 col-md-8 col-sm-8 col-8"
                      }`}
                    >
                      <div className="p-0 w-100">
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
                              {userIsPageOwner ? (
                                <>
                                  <EditProfileButton />
                                  <SettingsButton />
                                </>
                              ) : (
                                <>
                                  <FollowButton
                                    follow={followUser}
                                    unFollow={unFollowUser}
                                    isFollowing={isFollowingState}
                                  />
                                  <MessageButton
                                    userName={pageUser?.userName || ""}
                                  />
                                  <MoreButton />
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <div
                          className={`d-flex justify-content-between mt-3 ${
                            windowWidth > 768 ? "w-75" : ""
                          }`}
                        >
                          <p className="card-title d-inline fs-6">
                            <span className="fw-bold">{postsCount} </span> Posts
                          </p>
                          <p className="card-title d-inline fs-6">
                            <span className="fw-bold">
                              {followersCountState}{" "}
                            </span>
                            Followers
                          </p>
                          <p className="card-title d-inline fs-6">
                            <span className="fw-bold">
                              {followingsCountState}{" "}
                            </span>
                            Following
                          </p>
                        </div>

                        <p
                          className="fw-bold mb-0 mt-3"
                          style={{ fontSize: 15 }}
                        >
                          {pageUser?.fullName}
                        </p>

                        <p
                          className="my-0 text-light text-gray"
                          style={{ fontSize: 14 }}
                        >
                          Personal account
                        </p>
                        <p className="card-text mt-1" style={{ fontSize: 15 }}>
                          {pageUser?.bio}
                        </p>
                        <p className="card-text mt-3" style={{ fontSize: 13 }}>
                          <span className="text-gray">Followed by</span>
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
              </div>

              <ul
                className="nav nav-underline d-flex justify-content-evenly mx-auto"
                style={{ maxWidth: 600 }}
              >
                <li className="nav-item">
                  <Link
                    to={`/profile/${pageUser?.userName}`}
                    className={`nav-link ${
                      activeTab === "posts"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    style={{ fontSize: fontSize }}
                  >
                    <span style={{ fontSize: 15 }}>
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
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/profile/${pageUser?.userName}/reels`}
                    className={`nav-link ${
                      activeTab === "reels"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    style={{ fontSize: fontSize }}
                  >
                    <span style={{ fontSize: 15 }}>
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
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/profile/${pageUser?.userName}/tagged`}
                    className={`nav-link ${
                      activeTab === "tagged"
                        ? "border-bottom text-light"
                        : "text-gray"
                    }`}
                    style={{ fontSize: fontSize }}
                  >
                    <span style={{ fontSize: 15 }}>
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
                  </Link>
                </li>

                {userIsPageOwner && (
                  <li className="nav-item">
                    <Link
                      to={`/profile/saved`}
                      className={`nav-link ${
                        activeTab === "saved"
                          ? "border-bottom text-light"
                          : "text-gray"
                      }`}
                      style={{ fontSize: fontSize }}
                    >
                      <span style={{ fontSize: 15 }}>
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
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 mx-auto">
              <div className="row">{children}</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
