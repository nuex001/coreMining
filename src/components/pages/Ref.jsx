import React, { useState } from "react";
import "../../assets/css/ref.css";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";
import rock from "../../assets/images/rock.svg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
function Ref() {
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
      const [refs, setRefs] = useState([
      {
        username:"streetdev",
        stage:0,
        points:2000000,
      },
      {
        username:"streetdev1",
        stage:1,
        points:3000000,
      },
      {
        username:"streetdev2",
        stage:2,
        points:4000000,
      },
      {
        username:"streetdev3",
        stage:3,
        points:6000000,
      },
      {
        username:"streetdev4",
        stage:4,
        points:8000000,
      },
    ]);
  return (
    <div className="ref">
      <h1>4 Referraals</h1>
      <div className="copyCont">
        <ul>
          <h2>My invite Link</h2>
          <p>https://t.me/News_Pointsbot?start=666c6ae63aea96033a8eda9b</p>
        </ul>
        <div className="btn">Copy</div>
      </div>
      <h3>My Referrals:</h3>
      <div className="rows">
        {
            refs &&
            refs.map((ref,idx)=>(
                <div className="box">
                <div className="txt">
                <h4>{ref.username}</h4>
                  <div className="stage">
                    <img src={stageImg[ref.stage]} alt={stages[ref.stage]} />
                    <h6>{stages[ref.stage]}</h6>
                  </div>
                </div>
                <h5>{ref.points}</h5>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default Ref;
