import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { DetailedApiUrl } from "../../Constants/Apis/apis";
const DetailedVideoCard = () => {
    const [isLoading,setIsLoading]=useState(true)
  const { id } = useParams();
  const Apiurl=`${DetailedApiUrl}${id}`
  const jwt=Cookies.get('jwt_token')
  useEffect(() => {
    
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const fetchData = async () => {
      try {
        // throw new Error("guje");
        const fetchedData = await fetch(Apiurl, options);
        const response = await fetchedData.json();
        console.log(response);
      } catch {
        setIsLoading("caught");
        return;
      }
      setIsLoading(false);
    };
    fetchData();
  });
  return <h1>{id}</h1>;
};
export default DetailedVideoCard;
