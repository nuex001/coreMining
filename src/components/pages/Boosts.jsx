import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/boosts.css";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";
import rock from "../../assets/images/rock.svg";
import speed from "../../assets/images/speed.svg";
import bot from "../../assets/images/bot.svg";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaHandSpock } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import {
  clear,
  equipTools,
  getUser,
  rechargLevel,
} from "../../redux/CoreMining";
import { useSelector, useDispatch } from "react-redux";
import { errorMsgs, successMsg } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Boosts() {
  const dispatch = useDispatch();
  const { user, Userpoint, error, success } = useSelector(
    (state) => state.CoreMining
  );
  const [stages, setStages] = useState([
    "Novice",
    "Experienced",
    "Journeyman",
    "Master",
    "Veteran",
  ]);
  const [stageImg, setStageImg] = useState([
    novice,
    experience,
    Journeyman,
    Master,
    Veteran,
  ]);
  const [tankPoint, setTankPoint] = useState(null);
  const [check, setCheck] = useState(false);
  const [popUp, setpopUp] = useState(null);
  const [tools] = useState([100000, 1000000, 5000000, 10000000, 100000000]);

  const [recharge_level] = useState([
    100000, 400000, 700000, 1000000, 1300000, 1600000, 1900000, 2200000,
    2500000, 2800000, 3100000, 3400000, 3700000, 4000000, 4300000,
  ]);

  // Function to get the current date as a string in the format YYYY-MM-DD
  function getCurrentDateString() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    let day = currentDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // Function to initialize or update the refill tank
  function initializeRefillTank() {
    const todayDateString = getCurrentDateString();
    const storedDate = localStorage.getItem(`${user.username}_lastRefillDate`);
    const refillTankKey = `${user.username}_refillTank`;
    const fulltank = 3;

    if (storedDate !== todayDateString) {
      // It's a new day, reset the refill tank to fulltank and update the date in localStorage
      localStorage.setItem(`${user.username}_lastRefillDate`, todayDateString);
      localStorage.setItem(refillTankKey, fulltank);
      setTankPoint(fulltank);
      // console.log(`New day detected, refill tank set to ${fulltank}.`);
    } else {
      // It's the same day, leave the refill tank as it is
      let currentRefillTank = localStorage.getItem(refillTankKey);
      if (currentRefillTank === null) {
        // If refill tank is not set, initialize it to fulltank
        localStorage.setItem(refillTankKey, fulltank);
      }
      // console.log("Same day detected, refill tank remains unchanged.");
    }
  }

  // Call the function to initialize or update the refill tank
  const showTask = (txt) => {
    setpopUp(txt);
  };

  const closeTask = (idx) => {
    setCheck(false);
    setpopUp(null);
  };

  // Refill Tank
  const refillTank = (e) => {
    const refillTankval = localStorage.getItem(`${user.username}_refillTank`);
    if (refillTankval > 0) {
      setTankPoint(refillTankval - 1);
      localStorage.setItem(`${user.username}_tapCount`, 2500);
      localStorage.setItem(
        `${user.username}_lastUpdated`,
        Date.now().toString()
      );
      localStorage.setItem(`${user.username}_refillTank`, refillTankval - 1);
      setCheck(false);
      setpopUp(null);
    }
  };
  // EQUIP TOOLS
  const equip = (e) => {
    dispatch(equipTools());
    setCheck(false);
    setpopUp(null);
  };
  // RECHARGE LEVEL
  const recharge = (e) => {
    dispatch(rechargLevel());
    setCheck(false);
    setpopUp(null);
  };

  //
  useEffect(() => {
    // console.log(error);
    if (error !== null && error) {
      errorMsgs(error.err);
    } else if (success) {
      successMsg(success);
      dispatch(getUser());
    }
    dispatch(clear());
  }, [success, error]);

  // Get User
  useEffect(() => {
    if (user) {
      initializeRefillTank();
      const refillTankval = localStorage.getItem(`${user.username}_refillTank`);
      setTankPoint(refillTankval);
    }
  }, [user]);

  // Get User
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className="boosts">
      <ToastContainer />
      {user && (
        <div className="txHeader">
          <h1>{Userpoint}</h1>
          <Link to="/league" className="stage">
            <img src={stageImg[user.stage]} alt={stages[user.stage]} />
            <h2>{stages[user.stage]}</h2>
            <MdKeyboardDoubleArrowRight className="icon" />
          </Link>
        </div>
      )}
      <main>
        <h1>DAILY BOOSTERS</h1>
        <div
          className="tank"
          onClick={(e) => {
            showTask("refill");
          }}
        >
          <img src={speed} alt="speed" />
          <ul>
            <li>Full tank</li>
            <li>
              {tankPoint && tankPoint}
              <span>/3</span>
            </li>
          </ul>
        </div>
        <div className="rows">
          <div
            className="box"
            onClick={(e) => {
              showTask("multitap");
            }}
          >
            <img
              src={user && stageImg[user.stage + 1]}
              alt={user && stages[user.stage + 1]}
            />
            <ul>
              <li>Multitap</li>
              <li>
                {user && tools[user.stage + 1]}{" "}
                <span>|{user && stages[user.stage + 1]}</span>
              </li>
              <MdKeyboardDoubleArrowRight className="arrw" />
            </ul>
          </div>
          <div
            className="box"
            onClick={(e) => {
              showTask("speed");
            }}
          >
            <img src={speed} alt="speed" />
            <ul>
              <li>Recharging Speed</li>
              <li>
                {user && recharge_level[user.rechargeLvl + 1]}
                <span> | {user && user.rechargeLvl + 1} level</span>
              </li>
              <MdKeyboardDoubleArrowRight className="arrw" />
            </ul>
          </div>
          <div
            className="box nonactive"
            onClick={(e) => {
              showTask("bot");
            }}
          >
            <img src={bot} alt="bot" />
            <ul>
              <li>Mining Bot</li>
              <li>200 0000</li>
              <MdKeyboardDoubleArrowRight className="arrw" />
            </ul>
          </div>
        </div>
        {popUp && popUp === "multitap" ? (
          <div className="popUp">
            <div className="box">
              <CiCircleRemove className="cancel" onClick={closeTask} />
              <img
                src={stageImg[user.stage + 1]}
                alt={stages[user.stage + 1]}
              />
              <ul>
                <li>Multitap</li>
                <li>
                  {user && tools[user.stage + 1]}{" "}
                  <span>|{user && stages[user.stage + 1]}</span>
                </li>
              </ul>
              <div className="btn" onClick={equip}>
                Equip
              </div>
            </div>
          </div>
        ) : popUp === "speed" ? (
          <div className="popUp">
            <div className="box">
              <CiCircleRemove className="cancel" onClick={closeTask} />
              <img src={speed} alt="speed" />
              <ul>
                <li>Recharging Speed</li>
                <li>
                  {user && recharge_level[user.rechargeLvl + 1]}
                  <span> | {user && user.rechargeLvl + 1} level</span>
                </li>
              </ul>
              <div className="btn" onClick={recharge}>
                Increase
              </div>
            </div>
          </div>
        ) : popUp === "bot" ? (
          <div className="popUp">
            <div className="box">
              <CiCircleRemove className="cancel" onClick={closeTask} />
              <img src={bot} alt="bot" />
              <ul>
                <li>Mining Bot</li>
                <li>200 0000</li>
              </ul>
              <div className="btn">Coming Soon</div>
            </div>
          </div>
        ) : popUp === "refill" ? (
          <div className="popUp">
            <div className="box">
              <CiCircleRemove className="cancel" onClick={closeTask} />
              <img src={speed} alt="speed" />
              <ul>
                <li>Full Tank</li>
                <li>Fill your energy to the max</li>
              </ul>
              <div className="btn" onClick={refillTank}>
                Fill
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}

export default Boosts;
