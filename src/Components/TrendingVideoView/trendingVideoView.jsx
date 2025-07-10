import "./trendingVideoView.css";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import { useContext } from "react";
const TrendingVideoView = (props) => {
  const { isDark } = useContext(ThemeContext);
  const { id, channel, published_at, title, thumbnail_url, view_count } =
    props.details;
  const { name, profile_image_url } = channel;
  return (
    <div className="trendingElement">
      <img src={thumbnail_url} className="trendthumbnail" alt="thumbnail" />
      <div className="trendingDetails">
        <img src={profile_image_url} className="profileImg" alt="profile" />
        <div className="trendingTexts">
          <h2 className={isDark?"darkTrendingTitle trendingTitle":"trendingTitle"}>{title}</h2>
          <p className="trendingName">{name}</p>
          <div className="trendingViews">
            <p className="trendingName">{view_count} Views</p>
            <p className="trendingName">*{published_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrendingVideoView;
