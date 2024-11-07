import { ReactNode, useEffect, useState } from "react";
import ProfileImage from "../ProfileImage/ProfileImage";
import Layout from "../Layout/Layout";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../auth/authStore";
import EditProfileButton from "./Buttons/EditProfileButton";
import FollowButton from "./Buttons/FollowButton";
import MessageButton from "./Buttons/MessageButton";
import MoreButton from "./Buttons/MoreButton";
import SettingsButton from "./Buttons/SettingsButton";
import ProfileUserNameButton from "./Buttons/ProfileUserNameButton";
import TabsRow from "./Tabs/TabsRow";
import StatsRow from "./Stats/StatsRow";
import BackButton from "./Buttons/BackButton";
import { useUserByUserName } from "../../react-query/hooks/userHooks";
import {
  usePostsByAuthorId,
  usePostsCountByAuthor,
} from "../../react-query/hooks/PostHooks";
import {
  useFollow,
  useFollowersCount,
  useFollowingsCount,
  useIsFollowing,
  useUnFollow,
} from "../../react-query/hooks/FollowHooks";

interface Props {
  userName: string;
  children: ReactNode;
  activeTab: string;
}
const Profile = ({ userName, children, activeTab }: Props) => {
  const { user, isAuthenticated } = useAuthStore();

  const { data: pageUser, isSuccess } = useUserByUserName(userName);

  const userIsPageOwner = userName == user?.userName;

  const { data: posts } = usePostsByAuthorId(pageUser?.id || "");
  const { data: postsCount } = usePostsCountByAuthor(pageUser?.id || "");

  const { data: isFollowing } = useIsFollowing(pageUser?.id || "", isSuccess);
  const [isFollowingState, setIsFollowingState] = useState<boolean>(
    isFollowing || false
  );

  const { data: followersCount } = useFollowersCount(
    pageUser?.id || "",
    isSuccess
  );
  const [followersCountState, setFollowersCountState] = useState<number>(0);

  const { data: followingsCount } = useFollowingsCount(
    pageUser?.id || "",
    isSuccess
  );
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
    if (pageUser && followersCount != undefined) {
      follow.mutateAsync(pageUser.id);
      setIsFollowingState(true);
      setFollowersCountState(followersCountState + 1);
    }
  }

  const unFollow = useUnFollow();
  async function unFollowUser() {
    if (pageUser && followersCount != undefined) {
      unFollow.mutateAsync(pageUser.id);
      setIsFollowingState(false);
      setFollowersCountState(followersCountState - 1);
    }
  }

  const md = 768;
  const sm = 576;
  const fontSize = 12;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSmallerThanMedium, setIsSmallerThanMedium] = useState(
    window.innerWidth < md
  );
  const [isSmallerThanSmall, setIsSmallerThanSmall] = useState(
    window.innerWidth < sm
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsSmallerThanMedium(windowWidth < md);
      setIsSmallerThanSmall(windowWidth < sm);
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
      {isSmallerThanMedium && userIsPageOwner && (
        <div className="container-fluid border-bottom border-gray">
          <div className="d-flex justify-content-between py-1">
            <SettingsButton dimension={28} />
            <ProfileUserNameButton user={user} />
          </div>
        </div>
      )}

      {isSmallerThanMedium && !userIsPageOwner && (
        <div className="container-fluid border-bottom border-gray">
          <div className="d-flex justify-content-between align-items-center py-1">
            <BackButton dimension={28} />
            <span className="text-light fw-bold p-0" style={{ fontSize: 15 }}>
              {pageUser?.userName}
            </span>
          </div>
        </div>
      )}

      <Layout currentPage="Profile">
        <div
          className={`container-fluid ${
            !isSmallerThanMedium ? "mt-5" : "mt-3"
          }`}
        >
          <div
            className={`d-flex ${
              !isSmallerThanMedium ? "justify-content-center" : ""
            }`}
          >
            <div
              style={{
                marginRight: isSmallerThanSmall
                  ? 20
                  : isSmallerThanMedium
                  ? 40
                  : 60,
              }}
            >
              <ProfileImage
                user={pageUser}
                widthHeight={
                  isSmallerThanSmall ? 75 : isSmallerThanMedium ? 100 : 150
                }
              />
            </div>
            {/* Medium */}
            {!isSmallerThanMedium && (
              <div>
                <div className="d-flex align-items-center mb-2">
                  <div className="my-2 me-2">
                    <span className="h5 text-light">{pageUser?.userName}</span>
                  </div>
                  {userIsPageOwner ? (
                    <>
                      <EditProfileButton
                        isBiggerThanMedium={!isSmallerThanMedium}
                      />
                      <SettingsButton dimension={22} />
                    </>
                  ) : (
                    <>
                      <FollowButton
                        isBiggerThanMedium={!isSmallerThanMedium}
                        follow={followUser}
                        unFollow={unFollowUser}
                        isFollowing={isFollowingState}
                      />
                      <MessageButton userName={pageUser?.userName || ""} />
                      <MoreButton />
                    </>
                  )}
                </div>
                <div
                  className="d-block d-flex justify-content-between my-3"
                  style={{ width: 350 }}
                >
                  <p className="text-light d-inline m-0">
                    {postsCount} <span className="text-gray">posts</span>
                  </p>
                  <p className="text-light d-inline m-0">
                    {followersCountState}{" "}
                    <span className="text-gray">followers</span>
                  </p>
                  <p className="text-light d-inline m-0">
                    {followingsCountState}{" "}
                    <span className="text-gray">following</span>
                  </p>
                </div>
                {pageUser?.fullName && (
                  <div className="d-block m-0">
                    <p
                      className="text-light fw-bold m-0"
                      style={{ fontSize: 15 }}
                    >
                      {pageUser.fullName}
                    </p>
                  </div>
                )}
                {pageUser?.bio && (
                  <div className="d-block m-0">
                    <p className="text-light m-0" style={{ fontSize: 15 }}>
                      {pageUser.bio}
                    </p>
                  </div>
                )}
                {!userIsPageOwner && (
                  <div className="d-block my-2">
                    <p className="card-text m-0" style={{ fontSize: 13 }}>
                      <span className="text-gray">Followed by</span>
                      <a
                        href="#"
                        className="text-decoration-none text-light fw-bold"
                      >
                        &nbsp;someuser
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
            {/* Small */}
            {isSmallerThanMedium && (
              <div>
                <div className="d-flex align-items-center">
                  <div className="my-2 d-inline">
                    <span className="h5 text-light">{pageUser?.userName}</span>
                  </div>
                  {userIsPageOwner ? (
                    <SettingsButton dimension={22} />
                  ) : (
                    <MoreButton />
                  )}
                </div>
                <div>
                  {userIsPageOwner ? (
                    <>
                      <EditProfileButton
                        isBiggerThanMedium={!isSmallerThanMedium}
                      />
                    </>
                  ) : (
                    <>
                      <FollowButton
                        isBiggerThanMedium={!isSmallerThanMedium}
                        follow={followUser}
                        unFollow={unFollowUser}
                        isFollowing={isFollowingState}
                      />
                      <MessageButton userName={pageUser?.userName || ""} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          {isSmallerThanMedium && (
            <div className="mt-4">
              {pageUser?.fullName && (
                <div className="d-block">
                  <p
                    className="text-light fw-bold m-0"
                    style={{ fontSize: 14 }}
                  >
                    {pageUser.fullName}
                  </p>
                </div>
              )}
              {pageUser?.bio && (
                <div className="d-block">
                  <p className="text-light m-0" style={{ fontSize: 13 }}>
                    {pageUser.bio}
                  </p>
                </div>
              )}
              {!userIsPageOwner && (
                <div className="d-block my-2">
                  <p className="card-text m-0" style={{ fontSize: 12 }}>
                    <span className="text-gray">Followed by</span>
                    <a
                      href="#"
                      className="text-decoration-none text-light fw-bold"
                    >
                      &nbsp;someuser
                    </a>
                  </p>
                </div>
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
        <TabsRow
          windowWidth={windowWidth}
          activeTab={activeTab}
          fontSize={fontSize}
          pageUser={pageUser}
          userIsPageOwner={userIsPageOwner}
        />
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
