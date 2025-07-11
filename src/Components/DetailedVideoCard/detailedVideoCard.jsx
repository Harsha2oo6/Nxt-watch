import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Cookies from "js-cookie";
import { BeatLoader } from "react-spinners";

import { DetailedApiUrl } from "../../Constants/Apis/apis";
import "./detailedVideoCard.css";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import VideoPlayer from "../VideoPlayer/videoPlayer";
import RenderFailure from "../FailureView/failureView";
import RenderDetails from "../RenderVideoDetails/renderVideoDetails";
import { SavedVideosContext } from "../../HOCs/SavedContext/savedContext";

const DetailedVideoCard = () => {
  // const {savedVideosArray}=useContext(SavedVideosContext)
  const { isDark } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const { id } = useParams();

  const Apiurl = `${DetailedApiUrl}${id}`;
  const jwt = Cookies.get("jwt_token");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  const fetchData = async () => {
    try {
      // throw new Error("guje");
      const fetchedData = await fetch(Apiurl, options);
      const response = await fetchedData.json();
      console.log(response);
      setVideoData(response.video_details);
    } catch {
      setIsLoading("caught");
      return;
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={isDark ? "darkDetailedVideo detailedVideo" : "detailedVideo"}
    >
      {isLoading === true ? (
        <div className="loader">
          <BeatLoader color={isDark ? "white" : "black"} />
        </div>
      ) : isLoading === "caught" ? (
        <RenderFailure onRetry={fetchData} />
      ) : (
        <div>
          <VideoPlayer url={videoData.video_url} />
          <RenderDetails details={videoData} />
        </div>
      )}
    </div>
  );
};
export default DetailedVideoCard;
