import { ReactNode, useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import Layout from "../Layout/Layout";
import { Link, Navigate } from "react-router-dom";

import useAuthStore from "../../auth/authStore";
import useUserByUserName from "../../react-query/hooks/userHooks/useUserByUserName";
import usePostsCount from "../../react-query/hooks/userHooks/usePostsCount";
import useFollowersCount from "../../react-query/hooks/followHooks/useFollowersCount";
import useFollowingsCount from "../../react-query/hooks/followHooks/useFollowingsCount";
import useIsFollowing from "../../react-query/hooks/followHooks/useIsFollowing";
import useFollow from "../../react-query/hooks/followHooks/useFollow";
import useUnfollow from "../../react-query/hooks/followHooks/useUnfollow";
import EditProfileButton from "./Buttons/EditProfileButton";
import FollowButton from "./Buttons/FollowButton";
import MessageButton from "./Buttons/MessageButton";
import MoreButton from "./Buttons/MoreButton";
import SettingsButton from "./Buttons/SettingsButton";
import ProfileUserNameButton from "./Buttons/ProfileUserNameButton";
import TabsRow from "./Tabs/TabsRow";
import StatsRow from "./Stats/StatsRow";

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

  const { data: followersCount } = useFollowersCount({
    userId: pageUser?.id || "",
    enabled: isSuccess,
  });
  const [followersCountState, setFollowersCountState] = useState<number>(0);

  const { data: followingsCount } = useFollowingsCount({
    userId: pageUser?.id || "",
    enabled: isSuccess,
  });
  const [followingsCountState, setFollowingsCountState] = useState<number>(0);

  useEffect(() => {
    if (isFollowing != undefined) setIsFollowingState(isFollowing);
  }, [isFollowing]);

  useEffect(() => {
    if (followersCount != undefined && followingsCount != undefined) {
      setFollowersCountState(followersCount);
      setFollowingsCountState(followingsCount);
    }
  }, [followersCount, followingsCount]);

  const follow = useFollow();
  async function followUser() {
    if (pageUser && followersCount) {
      follow.mutateAsync({ followingId: pageUser.id });
      setIsFollowingState(true);
      setFollowersCountState(followersCount + 1);
    }
  }

  const unFollow = useUnfollow();
  async function unFollowUser() {
    if (pageUser && followersCount) {
      unFollow.mutateAsync({ followingId: pageUser.id });
      setIsFollowingState(false);
      setFollowersCountState(followersCount - 1);
    }
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
            <SettingsButton dimension={28} />
            <ProfileUserNameButton user={user} />
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
                          user={pageUser}
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
                                    <SettingsButton dimension={22} />
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
                                  <SettingsButton dimension={22} />
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

                        <StatsRow
                          followersCount={followersCountState}
                          followingsCount={followingsCountState}
                          postsCount={postsCount || 0}
                          windowWidth={windowWidth}
                        />

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

              <TabsRow
                windowWidth={windowWidth}
                activeTab={activeTab}
                fontSize={fontSize}
                pageUser={pageUser}
                userIsPageOwner={userIsPageOwner}
              />
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
