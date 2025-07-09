import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoIosSearch } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import "./home.css";
import { LightThemeLogo } from "../../Constants/Images/logos";
import HomeViewVideo from "../HomeviewVideo/homeViewVideo";

const Home = () => {
  const [ismounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [tryAgain,setTryAgain]=useState(true);
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
        const fetchedData = await fetch(
          `https://apis.ccbp.in/videos/all?search=${searchQuery}`,
          options
        );
        console.log("retry");
        const response = await fetchedData.json();
        setVideosArray(response.videos);
      } catch {
        setIsLoading("caught");
      }
      setIsLoading(false)
    };
    fetchVideos();
  }, [searchQuery,tryAgain]);

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
  const renderNoVideosView = () => {
    return (
      <div className="noVideosView">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="noVideosimg"
        />
        <h1>No Search results found</h1>
        <h5>Try different key words or remove search filter</h5>
        <button onClick={() => setTryAgain(prev=>!prev)}>Retry</button>
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
      <div className="homeVideos">
        <form className="inputField" onSubmit={handleSubmit}>
          <input
            type="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="inputBar"
          />
          <button className="searchButton" type="submit">
            <IoIosSearch />
          </button>
        </form>
        <div className="videosField">
          {isLoading?<BeatLoader/>:(videosArray.length === 0 ? renderNoVideosView() : renderVideosList())}
        </div>
      </div>
    </div>
  );
};
export default Home;
