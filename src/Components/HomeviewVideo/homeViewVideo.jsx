import "./homeViewVideo.css";
const HomeViewVideo = (props) => {
  const { id, channel, published_at, thumbnail_url, title, view_count } =
    props.details;
  const { profile_image_url, name } = channel;
  return (
    <div className="videoElement">
      <img src={thumbnail_url} className="thumbnail" alt="thumbnail" />
      <div className="videoDetails">
        <img src={profile_image_url} className="profileImg" alt="profile" />
        <div className="videoTexts">
          <p className="videoTitle">{title}</p>
          <p className="videoName">{name}</p>
          <div className="views">
            <p className="videoName">{view_count}</p>
            <p className="videoName">{published_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeViewVideo;
