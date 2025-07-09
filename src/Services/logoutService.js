import Cookies from "js-cookie";

 export function LogoutService(){
    Cookies.remove('jwt_token')
 }