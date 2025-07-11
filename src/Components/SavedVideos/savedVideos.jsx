import { useContext } from "react";
import { SavedVideosContext } from "../../HOCs/SavedContext/savedContext";
import FieldBanner from "../FieldBanner/fieldBanner";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import { Savedicon } from "../../Common/Icons/icons";
import TrendingVideoView from "../TrendingVideoView/trendingVideoView";
import './savedVideos.css'

const SavedVideos = () => {
  const { savedVideosArray } = useContext(SavedVideosContext);
  const { isDark } = useContext(ThemeContext);

  

    const renderVideos=()=>{
      return (
          <ul className={isDark ? "darkSavedContainer savedContainer" : "savedContainer"}>
              {Object.values(savedVideosArray).map((video)=>{
                  return <TrendingVideoView key={video} details={video}/>
              })}
          </ul>
      )
    }
  return (
    <div className={isDark?"darkSavedPage savedPage":"savedPage"}>
      <FieldBanner name="Saved Videos" icon={Savedicon} />
        {renderVideos()}

      
    </div>
  );
};
export default SavedVideos;
