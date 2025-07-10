import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoIosSearch } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import "./home.css";
import { LightThemeLogo } from "../../Constants/Images/logos";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import HomeViewVideo from "../HomeviewVideo/homeViewVideo";

const Home = () => {
  const { isDark } = useContext(ThemeContext);
  const [ismounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [videosArray, setVideosArray] = useState([]);

  const jwt = Cookies.get("jwt_token");
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    const fetchVideos = async () => {
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
    fetchVideos();
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  const renderBanner = () => {
    return (
      <div className="banner">
        <div className="bannertop">
          <img src={LightThemeLogo} className="image" alt="logo" />
          <button className="removebanner" onClick={() => setIsMounted(false)}>
            x
          </button>
        </div>
        <p className="buytag">
          Buy Nxt Watch Premium prepaid plans with <br /> UPI
        </p>
        <div>
          <button className="getit">GET IT NOW</button>
        </div>
      </div>
    );
  };
  const renderFailure = () => {
    return (
      <div
        className={isDark ? "darknoVideosView noVideosView" : "noVideosView"}
      >
        <img
          src={
            isDark
              ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              : "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          }
          className="noVideosimg"
          alt="failed"
        />
        <h1>Opps! something went wrong</h1>
        <h5>We are having some trouble to complete your request.</h5>
        <p>Please try again</p>
        <button className="retry" onClick={() => setSearchQuery(inputValue)}>
          Retry
        </button>
      </div>
    );
  };
  const renderNoVideosView = () => {
    return (
      <div
        className={isDark ? "darknoVideosView noVideosView" : "noVideosView"}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="noVideosimg"
          alt="noVideos"
        />
        <h1>No Search results found</h1>
        <h5>Try different key words or remove search filter</h5>
        <button className="retry" onClick={() => setSearchQuery(inputValue)}>
          Retry
        </button>
      </div>
    );
  };
  const renderVideosList = () => {
    return (
      <ul className="videosContainer">
        {videosArray.map((video) => {
          return <HomeViewVideo key={video.id} details={video} />;
        })}
      </ul>
    );
  };
  return (
    <div className="home">
      {ismounted ? renderBanner() : null}
      <div className={isDark ? "darkhomeVideos homeVideos" : "homeVideos"}>
        <form className="inputField" onSubmit={handleSubmit}>
          <input
            type="Search"
            value={inputValue}
            placeholder="Search"
            onChange={(e) => setInputValue(e.target.value)}
            className={isDark ? "darkinputBar inputBar" : "inputBar"}
          />
          <button
            className={
              isDark ? "darksearchButton searchButton" : "searchButton"
            }
            type="submit"
          >
            <IoIosSearch />
          </button>
        </form>
        <div className="videosField">
          {isLoading === true ? (
            <BeatLoader color={isDark?"white":"black"} />
          ) : isLoading === "caught" ? (
            renderFailure()
          ) : videosArray.length === 0 ? (
            renderNoVideosView()
          ) : (
            renderVideosList()
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
