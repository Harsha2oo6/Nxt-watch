import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import RenderFailure from "../FailureView/failureView";
import { GamingApiUrl } from "../../Constants/Apis/apis";
import GamingView from "../GamingView/gamingView";
import FieldBanner from "../FieldBanner/fieldBanner.jsx";
import { Gamingicon } from "../../Common/Icons/icons";
import { BeatLoader } from "react-spinners";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";

import "./gaming.css";

const Gaming = () => {
  const { isDark } = useContext(ThemeContext);
  const [gamesArray, setGamesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const jwt = Cookies.get("jwt_token");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };

  const fetchData = async () => {
    try {
      // throw new Error("Testing");
      const fetchedData = await fetch(GamingApiUrl, options);
      const response = await fetchedData.json();
      console.log(response);
      setGamesArray(response.videos);
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
        className={
          isDark ? "darkGameContainers gamingContainers" : "gamingContainers"
        }
      >
        {gamesArray.map((game) => (
          <GamingView key={game.id} details={game} />
        ))}
      </ul>
    );
  };

  return (
    <div className={isDark ? "darkTrendingPage gamingPage" : "gamingPage"}>
      {isLoading === "caught" ? (
        <div className="gamingFailure">
          <RenderFailure onRetry={fetchData} />
        </div>
      ) : isLoading ? (
        <div className="gameLoader">
          <BeatLoader color={isDark ? "white" : "black"} />
        </div>
      ) : (
        <div>
          <FieldBanner name="Gaming" icon={Gamingicon} />
          {renderVideos()}
        </div>
      )}
    </div>
  );
};

export default Gaming;
