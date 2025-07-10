import { useContext } from "react";

import { IoMdHome } from "react-icons/io";
import { RiPlayListAddFill } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

import { ThemeContext } from "../../HOCs/ThemeContext/themeContext";
import NavlinkComponent from "../../HOCs/Navlinks/navlink";

import "./sidenavbar.css";

const SideNavbar = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={isDark ? "darkSidenav sidenav" : "sidenav"}>
      <nav>
        <NavlinkComponent toPath="/" name="Home" icon={<IoMdHome />} />
        <NavlinkComponent
          toPath="/trending"
          name="Trending"
          icon={<FaFireFlameCurved />}
        />
        <NavlinkComponent
          toPath="/gaming"
          name="Gaming"
          icon={<SiYoutubegaming />}
        />
        <NavlinkComponent
          toPath="/savedvideos"
          name="Saved Videos"
          icon={<RiPlayListAddFill />}
        />
      </nav>

      <div className={isDark ? "darkFoot foot" : "foot"}>
        <h3>CONTACT US</h3>
        <div className="apps">
          <FaFacebookF className="facebook fa" size={30} />
          <FaTwitter className="twitter fa" size={30} />
          <FaLinkedinIn className="linkedin fa" size={30} />
        </div>
        <h4>
          Enjoy! Now to see your <br />
          channels and <br />
          recommendations!
        </h4>
      </div>
    </div>
  );
};

export default SideNavbar;
