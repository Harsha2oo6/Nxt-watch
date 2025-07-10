import { useContext } from 'react';
import './failureView.css'
import { ThemeContext } from '../../HOCs/ThemeContext/themeContext';
const  RenderFailure = ({onRetry}) => {
    const {isDark}=useContext(ThemeContext)
    return (
      <div className={isDark ? "darknoVideosView noVideosView" : "noVideosView"}>
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
        <button className="retry" onClick={onRetry}>Retry</button>
      </div>
    );
  };
  export default RenderFailure