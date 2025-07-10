import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { GamingApiUrl } from "../../Constants/Apis/apis";
import GamingView from "../GamingView/gamingView";
import FieldBanner from "../FieldBanner/FieldBanner";
import { Gamingicon } from "../../Common/Icons/icons";
import { BeatLoader } from "react-spinners";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import "./gaming.css";

const Gaming = () => {
  const { isDark } = useContext(ThemeContext);
  const [gamesArray, setGamesArray] = useState([]);
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
    fetchData();
  }, []);

  const renderVideos = () => {
    return (
      <ul className={isDark?"darkGameContainers gamingContainers":"gamingContainers"}>
        {gamesArray.map((game) => {
          return <GamingView key={game.id} details={game} />;
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
    <div className={isDark ? "darkTrendingPage gamingPage" : "gamingPage"}>
      {isLoading === "caught" ? (
        renderFailure()
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
