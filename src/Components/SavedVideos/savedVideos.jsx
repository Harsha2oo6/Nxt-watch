import { useContext } from "react";
import { SavedVideosContext } from "../../HOCs/SavedContext/savedContext";
import FieldBanner from "../FieldBanner/fieldBanner";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import { Savedicon } from "../../Common/Icons/icons";
import TrendingVideoView from "../TrendingVideoView/trendingVideoView";
import "./savedVideos.css";

const SavedVideos = () => {
  const { savedVideosArray } = useContext(SavedVideosContext);
  const { isDark } = useContext(ThemeContext);

  const renderVideos = () => {
    return (
      <ul
        className={
          isDark ? "darkSavedContainer savedContainer" : "savedContainer"
        }
      >
        {Object.values(savedVideosArray).map((video) => {
          return <TrendingVideoView key={video} details={video} />;
        })}
      </ul>
    );
  };
  return (
    <div className={isDark ? "darkSavedPage savedPage" : "savedPage"}>
      {Object.keys(savedVideosArray).length !== 0 ? (
        <>
          <FieldBanner name="Saved Videos" icon={Savedicon} />
          {renderVideos()}
        </>
      ) : (
        <div className="noSaveTexts">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
            className="noSaved"
            alt="noSAvedVideos"
          />
          <h1 className={isDark?"darkNoSaveHead":""}>No Saved Videos Found</h1>
          <p className={isDark?"darkNoSavePara":""}>You can save your videos while watching them.</p>
        </div>
      )}
    </div>
  );
};
export default SavedVideos;
