import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";
import Popup from "reactjs-popup";

import { DarkThemeLogo, LightThemeLogo } from "../../Constants/Images/logos.js";
import { ProfileImage } from "../../Constants/Images/profile.js";
import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import { LogoutService } from "../../Services/logoutService.js";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <>
      <div className={isDark ? "darkHeader header" : "header"}>
        <div>
          <img
            src={isDark ? DarkThemeLogo : LightThemeLogo}
            className="header-logo"
            alt="header-logo"
          />
        </div>
        <div className="options">
          <button
            className={
              isDark ? "darkTheme-button theme-button" : "theme-button"
            }
            onClick={toggleTheme}
          >
            {isDark ? (
              <CiLight className="mode" />
            ) : (
              <MdDarkMode className="mode" />
            )}
          </button>
          <img src={ProfileImage} className="profile" alt="profile" />
          <AiOutlineMenu className={isDark?"darkMenu menu":"menu"}/>
          <Popup
            modal
            trigger={
              <div>
                <button className="logoutbutton" ><LuLogOut className={isDark?"darklogouticon logouticon":"logouticon"} /></button>
                <button
                  type="button"
                  className={isDark ? "darkLogout logout" : "logout"}
                >
                  Logout
                </button>
              </div>
            }
          >
            {(close) => (
              <div className={isDark ? "darkModal modal" : "modal"}>
                <div className="content">Are you sure, you want to logout?</div>
                <div>
                  <button className="close popupBut" onClick={close}>
                    Close
                  </button>
                  <button
                    className="confirm popupBut"
                    onClick={() => {
                      LogoutService();
                      navigate("/login", { replace: true });
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </>
  );
};
export default Header;
