import './icons.css'

import { FaFireFlameCurved } from "react-icons/fa6";
import { SiYoutubegaming } from "react-icons/si";
import { RiPlayListAddFill } from "react-icons/ri";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";

export const Lightmodeicon = <CiLight className="mode" />;
export const Darkmodeicon = <MdDarkMode className="mode" />;
export const Flameicon = <FaFireFlameCurved />;
export const Gamingicon = <SiYoutubegaming />;
export const Savedicon = <RiPlayListAddFill style={{margin:'5px'}}/>
export const LikeIcon=<SlLike style={{margin:'5px'}}/>
export const DislikeIcon=<SlDislike style={{margin:'5px'}}/>