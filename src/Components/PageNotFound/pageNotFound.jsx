import { useContext } from "react";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import "./pageNotFound.css";

const PageNotFound = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className={isDark?"darkpagenotfound pagenotfound":"pagenotfound"}>
      {isDark ? (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
          className="noPageImg"
          alt="Page not found"
        />
      ) : (
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
          className="noPageImg"
          alt="Page not found"
        />
      )}
      <div className="noPageTexts">
        <h1 className={isDark?"darkNoSaveHead":""}>Page not found</h1>
        <p className={isDark?"darkNoSavePara":""}>We are sorry, the page you requested could not be found</p>
      </div>
    </div>
  );
};
export default PageNotFound;
