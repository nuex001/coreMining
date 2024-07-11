import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/task.css";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";
import rock from "../../assets/images/rock.svg";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SiTask } from "react-icons/si";
import { CiCircleRemove } from "react-icons/ci";

function Task() {
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

  const [task, setTask] = useState(null);

  const [tasks, setTasks] = useState([
    {
      title: "Join Our Youtube Channel",
      description: "Join Our Youtube Channel to earn 5000000 points",
      point: 5000000,
      link: "https://t.me/News_Pointsbot",
      claimed: false,
    },
    {
      title: "Follow our Official X account",
      description: "Follow our Official X account to earn 5000000 points",
      point: 5000000,
      link: "https://x.com/nuelyoungtech",
      claimed: false,
    },
    {
      title: "Follow our Devs X account",
      description: "Follow our Devs X account to earn 5000 points",
      point: 5000,
      link: "https://x.com/nuelyoungtech",
      claimed: false,
    },
  ]);

  const showTask = (idx) => {
    setTask(tasks[idx]);
  };
  const closeTask = (idx) => {
    setCheck(false);
    setTask(null);
  };
  return (
    <div className="task">
      <div className="txHeader">
        <h1>{points}</h1>
        <Link to="#" className="stage">
          <img src={stageImg[0]} alt={stages[0]} />
          <h2>{stages[0]}</h2>
          <MdKeyboardDoubleArrowRight className="icon" />
        </Link>
      </div>
      <main>
        <h1>OUR TASKS</h1>
        <div className="rows">
          {tasks &&
            tasks.map((task, idx) => (
              <div
                className="box"
                key={idx}
                onClick={(e) => {
                  showTask(idx);
                }}
              >
                <SiTask className="icon" />
                <ul>
                  <li>{task.title}</li>
                  <li>{task.point}</li>
                  <MdKeyboardDoubleArrowRight className="arrw" />
                </ul>
              </div>
            ))}
        </div>
        {task && (
          <div className="popUp">
            <div className="box">
              <CiCircleRemove className="cancel" onClick={closeTask} />
              <SiTask className="icon" />
              <ul>
                <li>{task.title}</li>
                <li>{task.point}</li>
              </ul>
              {!check ? (
                <a
                  href="#"
                  target="_blank"
                  className="btn"
                  onClick={(e) => {
                    setCheck(true);
                  }}
                >
                  Check
                </a>
              ) : (
                <div className="btn">Claim</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Task;
