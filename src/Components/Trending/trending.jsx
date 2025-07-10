import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./trending.css";
import { TrendingApiUrl } from "../../Constants/Apis/apis";
import FieldBanner from "../FieldBanner/FieldBanner";
import { Flameicon } from "../../Common/Icons/icons";
import { BeatLoader } from "react-spinners";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import TrendingVideoView from "../TrendingVideoView/trendingVideoView";

const Trending = () => {
  const { isDark } = useContext(ThemeContext);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const jwt = Cookies.get("jwt_token");
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const fetchData = async () => {
      try {
        // throw new Error("guje");
        const fetchedData = await fetch(TrendingApiUrl, options);
        const response = await fetchedData.json();
        console.log(response.videos);
        setTrendingVideos(response.videos);
      } catch {
        setIsLoading("caught");
        return;
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderVideos = () => {
    return (
      <ul className={isDark?"darktrend trendingContainer":"trendingContainer"}>
        {trendingVideos.map((video) => {
          return <TrendingVideoView key={video.id} details={video} />;
        })}
      </ul>
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
        <button className="retry">Retry</button>
      </div>
    );
  };
  return (
    <>
      <div className={isDark?"darkTrendingPage trendingPage":"trendingPage"}>
        {isLoading === "caught" ? (
          <div className="box">{renderFailure()}</div>
        ) : isLoading ? (
          <div className="loader">
            <BeatLoader color={isDark ? "white" : "black"} />
          </div>
        ) : (
          <div className="black">
            <FieldBanner name="Trending" icon={Flameicon} />
            {renderVideos()}
          </div>
        )}
      </div>
    </>
  );
};
export default Trending;
