import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/ref.css";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";
import rock from "../../assets/images/rock.svg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchRefs, getUser, updatePoints } from "../../redux/CoreMining";

function Ref() {
  const dispatch = useDispatch();
  const { user, refs } = useSelector((state) => state.CoreMining);
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
  const timer = useRef(null);
  const copyBtnRef = useRef(null);

  const copyLink = (e) => {
    navigator.clipboard.writeText(
      `https://t.me/ironageBot?start=${sessionStorage.getItem("myId")}`
    );
    e.target.innerHTML = "Copied";
    timer.current = setTimeout(() => {
      if (copyBtnRef.current) {
        copyBtnRef.current.innerHTML = "Copy";
      }
    }, 700);
  };

  // Get User & Refs
  useEffect(() => {
    dispatch(fetchRefs());
    if (!user) {
      dispatch(getUser());
    }
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div className="ref">
      <h1>{refs && refs.length} Referraals</h1>
      <div className="copyCont">
        <ul>
          <h2>My invite Link</h2>
          <p>https://t.me/ironageBot?start={sessionStorage.getItem("myId")}</p>
        </ul>
        <div className="btn" onClick={copyLink} ref={copyBtnRef}>
          Copy
        </div>
      </div>
      <h3>My Referrals:</h3>
      <div className="rows">
        {refs &&
          refs.map((ref, idx) => (
            <div className="box" key={ref._id}>
              <div className="txt">
                <h4>{ref.username}</h4>
                <div className="stage">
                  <img src={stageImg[ref.stage]} alt={stages[ref.stage]} />
                  <h6>{stages[ref.stage]}</h6>
                </div>
              </div>
              <h5>{ref.point}</h5>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Ref;
