import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import WebApp from "@twa-dev/sdk";
import { useDispatch } from "react-redux";
import { logorsign } from "../../redux/CoreMining";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.investment);
  const navigate = useNavigate();

  const getData = (key) => {
    return sessionStorage.getItem(key);
  };

  const fetchUserData = async () => {
    try {
      const tg = WebApp;
      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;
      const referId = new URLSearchParams(window.location.search).get(
        "referrerId"
      );

      if (user) {
        const formdata = {
          username: user.username ? user.username : user.first_name,
          id: user.id,
          referId: referId || null,
        };
        dispatch(logorsign(formdata));
      } else {
        // Handle the case where user is not defined
        console.error("User data is not available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = getData("token");
    if (!token) {
      fetchUserData();
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      // Cleanup function
      return () => {
        clearTimeout(timeoutId); // Clear the timeout when component unmounts
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="loaderCont">
        <div class="loader"></div>
      </div>
    ); // Render a loading  while data is being fetched
  }

  return <Outlet />;
};

export default PrivateRoute;
