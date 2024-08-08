import StatsButton from "./StatsButton";

interface Props {
  windowWidth: number;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
}

const StatsRow = ({
  windowWidth,
  followersCount,
  followingsCount,
  postsCount,
}: Props) => {
  const isExtraSmallScreen = windowWidth < 575;
  return (
    <>
      {windowWidth < 768 ? (
        <div
          className="w-100 d-flex justify-content-evenly mt-3 border-bottom border-top border-gray"
          style={{ width: 200 }}
        >
          <StatsButton
            text="posts"
            value={postsCount}
            isExtraSmallScreen={isExtraSmallScreen}
          />
          <StatsButton
            text="followers"
            value={followersCount}
            isExtraSmallScreen={isExtraSmallScreen}
          />
          <StatsButton
            text="following"
            value={followingsCount}
            isExtraSmallScreen={isExtraSmallScreen}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatsRow;
