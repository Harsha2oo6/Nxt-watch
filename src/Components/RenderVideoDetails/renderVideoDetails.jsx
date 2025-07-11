import { useContext, useState } from "react";
import "./renderVideoDetails.css";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import { DislikeIcon, LikeIcon, Savedicon } from "../../Common/Icons/icons";
import { SavedVideosContext } from "../../HOCs/SavedContext/savedContext";

const RenderDetails = (props) => {
  const {
    title,
    description,
    id,
    published_at,
    thumbnail_url,
    video_url,
    view_count,
    channel,
  } = props.details;
  const { name, profile_image_url, subscriber_count } = channel;

  const { addVideos, savedVideosArray, deleteVideo } =
    useContext(SavedVideosContext);
  const { isDark } = useContext(ThemeContext);
  const [likeStatus, setLikeStatus] = useState(null);
  const isSaved = savedVideosArray[id];

  const handleSave = () => {
    isSaved ? deleteVideo(id) : addVideos(id,props.details);
  };

  return (
    <div
      className={
        isDark ? "darkVideoDescription videoDescription" : "videoDescription"
      }
    >
      <div className="descriptionTop">
        <h4>{title}</h4>
        <div className="descriptionDetails">
          <div
            className={
              isDark ? "darkDescriptionDate descriptionDate" : "descriptionDate"
            }
          >
            <p>{view_count} Views</p>
            <p>{published_at}</p>
          </div>
          <div
            className={
              isDark ? "darkDescriptionDate descriptionDate" : "descriptionDate"
            }
          >
            <button
              className={`${
                isDark ? "darkLikeSatusBut likeStatusBut" : "likeStatusBut"
              } ${likeStatus === "liked" ? "liked" : null}`}
              onClick={() => {
                likeStatus === "liked"
                  ? setLikeStatus(null)
                  : setLikeStatus("liked");
              }}
            >
              <div className="likeDiv">
                {LikeIcon}
                Like
              </div>
            </button>
            <button
              className={`${
                isDark ? "darkLikeSatusBut likeStatusBut" : "likeStatusBut"
              } ${likeStatus === "disliked" ? "liked" : null}`}
              onClick={() => {
                likeStatus === "disliked"
                  ? setLikeStatus(null)
                  : setLikeStatus("disliked");
              }}
            >
              <div className="likeDiv">
                {DislikeIcon}
                Dislike
              </div>
            </button>
            <button
              className={`${
                isDark ? "darkLikeSatusBut likeStatusBut" : "likeStatusBut"
              } ${isSaved ? "liked" : null}`}
              onClick={handleSave}
            >
              <div className="likeDiv">
                {Savedicon}
                {isSaved ? "Saved" : "Save"}
              </div>
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="descriptionBottom">
        <img src={profile_image_url} className="channelProfile" alt="profile" />
        <div className="profileDes">
          <div className="channelDescription">
            <h4>{name}</h4>
            <p className={isDark ? "darkSubscribers" : "subscribers"}>
              {subscriber_count}
            </p>
          </div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default RenderDetails;
