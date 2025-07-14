import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { BeatLoader } from "react-spinners";

import RenderFailure  from "../FailureView/failureView";
import { TrendingApiUrl } from "../../Constants/Apis/apis";
import { Flameicon } from "../../Common/Icons/icons";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";

import FieldBanner from "../FieldBanner/fieldBanner.jsx";
import TrendingVideoView from "../TrendingVideoView/trendingVideoView";

import "./trending.css";

const Trending = () => {
  const { isDark } = useContext(ThemeContext);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const jwt = Cookies.get("jwt_token");

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    try {
      // throw new Error('dfw')
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
  useEffect(() => {
    fetchData();
  }, []);

  const renderVideos = () => {
    return (
      <ul
        className={isDark ? "darktrend trendingContainer" : "trendingContainer"}
      >
        {trendingVideos.map((video) => (
          <TrendingVideoView key={video.id} details={video} />
        ))}
      </ul>
    );
  };

  return (
    <div className={isDark ? "darkTrendingPage trendingPage" : "trendingPage"}>
      {isLoading === "caught" ? (
        <div className="box">{<RenderFailure onRetry={fetchData}/>}</div>
      ) : isLoading ? (
        <div className="loader">
          <BeatLoader color={isDark ? "white" : "black"} />
        </div>
      ) : (
        <div className="banneredContainer">
          <FieldBanner name="Trending" icon={Flameicon} />
          {renderVideos()}
        </div>
      )}
    </div>
  );
};

export default Trending;
