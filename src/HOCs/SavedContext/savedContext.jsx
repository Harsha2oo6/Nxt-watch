import { createContext, useState } from "react";
import { useEffect } from "react";

export const SavedVideosContext = createContext();
const SavedVideosProvider = ({ children }) => {
  const local = JSON.parse(localStorage.getItem("saved_videos")) || {};
  const [savedVideosArray, setSavedVideosArray] = useState(local);
  const addVideos = (id, details) => {
    setSavedVideosArray((prev) =>
      prev[id] ? prev : { ...prev, [id]: details }
    );
  };
  const deleteVideo = (videoId) => {
    setSavedVideosArray((prev) => {
      const { [videoId]: x, ...rest } = prev;
      return rest
    });
  };
  useEffect(() => {
    localStorage.setItem("saved_videos", JSON.stringify(savedVideosArray));
  }, [savedVideosArray]);
  return (
    <SavedVideosContext.Provider
      value={{ savedVideosArray, addVideos, deleteVideo }}
    >
      {children}
    </SavedVideosContext.Provider>
  );
};
export default SavedVideosProvider;
