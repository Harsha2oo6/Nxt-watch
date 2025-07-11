import ReactPlayer from "react-player";

const VideoPlayer = ({url}) => {
  console.log(url)
  return (
    <div>
      <ReactPlayer
        src={url}
        controls
        width='100%'
        height='350px'
      />
    </div>
  );
};

export default VideoPlayer;