import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoIosSearch } from "react-icons/io";
import { BeatLoader } from "react-spinners";

import "./home.css";

import RenderNoVideosView from "../NoVideosView/noVideosView";
import RenderFailure from "../FailureView/failureView";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import HomeViewVideo from "../HomeviewVideo/homeViewVideo";
import RenderBanner from "../Banner/Banner";

const Home = () => {
  const { isDark } = useContext(ThemeContext);

  const [ismounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [videosArray, setVideosArray] = useState([]);

  const jwt = Cookies.get("jwt_token");
  const fetchVideos = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    try {
      // throw new Error("test failure")
      const fetchedData = await fetch(
        `https://apis.ccbp.in/videos/all?search=${searchQuery}`,
        options
      );
      console.log("retry");
      const response = await fetchedData.json();
      setVideosArray(response.videos);
    } catch {
      setIsLoading("caught");
      return;
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchVideos();
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const renderVideosList = () => (
    <ul className={isDark?"darkVideosContainer videosContainer":"videosContainer"}>
      {videosArray.map((video) => (
        <HomeViewVideo key={video.id} details={video} />
      ))}
    </ul>
  );

  return (
    <div className="home">
      {/* {ismounted ? <RenderBanner onCancel={()=>setIsMounted(false)}/> : null} */}
      <div className={isDark ? "darkhomeVideos homeVideos" : "homeVideos"}>
        <form className="inputField" onSubmit={handleSubmit}>
          <input
            type="Search"
            value={inputValue}
            placeholder="Search"
            onChange={(e) => setInputValue(e.target.value)}
            className={isDark ? "darksearchBar searchBar" : "searchBar"}
          />
          <button
            className={
              isDark ? "darksearchButton searchButton" : "searchButton"
            }
            type="submit"
          >
            <IoIosSearch className="searchicon" />
          </button>
        </form>
        <div className="videosField">
          {isLoading === true ? (
            <BeatLoader color={isDark ? "white" : "black"} />
          ) : isLoading === "caught" ? (
            <RenderFailure onRetry={fetchVideos} />
          ) : videosArray.length === 0 ? (
            <RenderNoVideosView onRetry={()=>setSearchQuery(inputValue)}/>
          ) : (
            renderVideosList()
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
