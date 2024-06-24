import { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import ExploreSearchPanel from "../../components/SearchPanel/ExploreSearchPanel";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import usePosts from "../../hooks/postHooks/usePosts";
import { Post } from "../../entities/Post";
interface PostItemProps {
  post: Post;
}
function ExplorePostItem({ post }: PostItemProps) {
  return (
    <div className="col-4 p-1">
      <Link to={`/explore/reels`}>
        <img
          className="object-fit-cover w-100"
          src={`data:image/png;base64,${post?.photoContent}`}
          alt=""
          style={{
            aspectRatio: 1,
          }}
        />
      </Link>
    </div>
  );
}
function ExplorePostsPanel() {
  const { data, error, isLoading } = usePosts();

  if (isLoading) return <LoadingIndicator />;

  if (error) return <p className="text-light">{error.message}</p>;

  return (
    <div className="row p-1">
      {data?.map((post) => (
        <ExplorePostItem post={post} />
      ))}
    </div>
  );
}

export default function Explore() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearchPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Layout currentPage={"Explore"}>
      <div className="row">
        <div className="col"></div>
        <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
          {isSmallScreen && (
            <div className="row py-2 border-bottom border-gray px-1">
              <div className="p-0" ref={dropdownRef}>
                <div className="mx-auto px-1 w-100">
                  <input
                    onClick={() => toggleSearchPanel()}
                    type="text"
                    className="form-control text-light border-0"
                    placeholder="Search"
                    style={{ borderRadius: 8, backgroundColor: "#323436" }}
                  />
                </div>
                <ExploreSearchPanel isOpen={isOpen} />
              </div>
            </div>
          )}
          <ExplorePostsPanel />
        </div>
        <div className="col"></div>
      </div>
    </Layout>
  );
}
