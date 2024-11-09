interface FollowButtonProps {
  isFollowing: boolean;
  follow: () => void;
  unFollow: () => void;
  isBiggerThanMedium: boolean;
}
const FollowButton = ({
  follow,
  unFollow,
  isFollowing,
  isBiggerThanMedium,
}: FollowButtonProps) => {
  return isFollowing ? (
    <button
      className={`btn btn-secondary py-1 ${
        isBiggerThanMedium ? "mx-2" : "me-2"
      }`}
      onClick={() => {
        unFollow();
      }}
    >
      Following&nbsp;
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
        />
      </svg> */}
    </button>
  ) : (
    <button
      className={`btn btn-primary py-1 ${isBiggerThanMedium ? "mx-2" : "me-2"}`}
      onClick={() => {
        follow();
      }}
    >
      Follow
    </button>
  );
};

export default FollowButton;
