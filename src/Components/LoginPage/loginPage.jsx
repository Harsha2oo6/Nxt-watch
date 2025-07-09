import { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import { LoginApiUrl } from "../../Constants/Apis/apis";
import { LoginProcess } from "../../Services/loginService";
import { DarkThemeLogo,LightThemeLogo } from "../../Constants/Images/logos.js";

import "./loginPage.css";

const LoginPage = () => {
  const { theme, toggleTheme,isDark } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowed, setShowed] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const loginResponse = await LoginProcess(LoginApiUrl, username, password);
    if (loginResponse.jwt_token) {
      Cookies.set("jwt_token", loginResponse.jwt_token);
      navigate("/", { replace: true });
    } else {
      setError(loginResponse.error_msg);
    }
    setUsername("");
    setPassword("");
  }
  return (
    <div className={isDark?'darkdisplay display':'display'}>
      <button onClick={toggleTheme}>mode</button>
      <form className={isDark?'darkcard loginCard':'loginCard'} onSubmit={handleLogin}>
        <img
          src={isDark?DarkThemeLogo:LightThemeLogo}
          className="login-logo"
          alt="Nxtwatch"
        />
        <div className="labelContainer">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            className="inputBar"
            placeholder="  Username"
            id="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError(null);
            }}
          />
        </div>
        <div className="labelContainer">
          <label htmlFor="password">PASSWORD</label>
          <input
            type={isShowed ? "text" : "password"}
            className="inputBar"
            placeholder="  Password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
          />
          <div className={isDark?'darkShow show':'show'}>
            <input
              id="showPassword"
              type="checkbox"
              onChange={() => setShowed(!isShowed)}
            />
            <label htmlFor="showPassword">
              Show Password
            </label>
          </div>
        </div>
        <button type="submit" className="loginButton">
          Login
        </button>
        <p className="errorMessage">{error ? error : null}</p>
      </form>
    </div>
  );
};
export default LoginPage;
