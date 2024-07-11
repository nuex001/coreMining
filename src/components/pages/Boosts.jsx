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

function Boosts() {
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
  const [points, setPoints] = useState(2000000);
  const [check, setCheck] = useState(false);

  const [popUp, setpopUp] = useState(null);

  const showTask = (txt) => {
    setpopUp(txt);
  };
  const closeTask = (idx) => {
    setCheck(false);
    setpopUp(null);
  };
  return (
    <div className="boosts">
      <div className="txHeader">
        <h1>{points}</h1>
        <Link to="#" className="stage">
          <img src={stageImg[0]} alt={stages[0]} />
          <h2>{stages[0]}</h2>
          <MdKeyboardDoubleArrowRight className="icon" />
        </Link>
      </div>
      <main>
        <h1>DAILY BOOSTERS</h1>
        <div className="tank" 
          onClick={(e) => {
            showTask("refill");
          }}
        >
          <img src={speed} alt="speed" />
          <ul>
            <li>Full tank</li>
            <li>
              3<span>/3</span>
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
            <img src={stageImg[0]} alt={stages[0]} />
            <ul>
              <li>Multitap</li>
              <li>
                50 0000 <span>|{stages[0]}</span>
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
                10 0000 <span>| 1 level</span>
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
              <img src={stageImg[0]} alt={stages[0]} />
              <ul>
                <li>Multitap</li>
                <li>
                  50 0000 <span>|{stages[0]}</span>
                </li>
              </ul>
              <div className="btn">Boost</div>
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
                  10 0000 <span>| 1 level</span>
                </li>
              </ul>
              <div className="btn">Increase</div>
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
                <li>
                  Fill your energy to the max
                </li>
              </ul>
              <div className="btn">Fill</div>
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
