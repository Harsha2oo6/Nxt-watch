import { LightThemeLogo } from "../../Constants/Images/logos";
import "./banner.css";
const RenderBanner = ({ onCancel }) => {
  return (
    <div className="banner">
      <div className="bannertop">
        <img src={LightThemeLogo} className="image" alt="logo" />
        <button className="removebanner" onClick={onCancel}>
          x
        </button>
      </div>
      <p className="buytag">
        Buy Nxt Watch Premium prepaid plans with <br /> UPI
      </p>
      <div>
        <button className="getit">GET IT NOW</button>
      </div>
    </div>
  );
};
export default RenderBanner;
