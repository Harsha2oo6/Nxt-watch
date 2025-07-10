import { useContext } from 'react';
import './noVideosView.css'
import { ThemeContext } from '../../HOCs/ThemeContext/themeContext';
const RenderNoVideosView = ({onRetry}) => {
    const {isDark}=useContext(ThemeContext)
    return (
      <div
        className={isDark ? "darknoVideosView noVideosView" : "noVideosView"}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          className="noVideosimg"
          alt="noVideos"
        />
        <h1>No Search results found</h1>
        <h5>Try different key words or remove search filter</h5>
        <button className="retry" onClick={ onRetry}>
          Retry
        </button>
      </div>
    );
  };

  export default RenderNoVideosView