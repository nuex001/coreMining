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
import { useSelector, useDispatch } from "react-redux";
import { claimTask, clear, fetchTasks, getUser } from "../../redux/CoreMining";
import { errorMsgs, successMsg } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebApp from "@twa-dev/sdk";

function Task() {
  const dispatch = useDispatch();
  const { user, tasks, error, success, Userpoint } = useSelector(
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
  const [check, setCheck] = useState(false);
  const [task, setTask] = useState(null);
  const [userId, setUserId] = useState(null);

  // FECTH Tasks
  const fetchuserId = async () => {
    try {
      const tg = WebApp;

      // Access initDataUnsafe
      const initDataUnsafe = tg.initDataUnsafe;
      const user = initDataUnsafe?.user;
      const referrerIdParam = new URLSearchParams(window.location.search).get(
        "referrerId"
      );

      if (user) {
        // console.log(user)
        const { id } = user;
        setUserId(id);
      }
    } catch (error) {
      console.log(error);
      errorMsgs("Server Error");
    }
  };

  const showTask = (idx) => {
    setTask(tasks[idx]);
  };
  const closeTask = (idx) => {
    setCheck(false);
    setTask(null);
  };
  // Claim Task
  const claimtask = async (e) => {
    e.preventDefault();
    const taskId = e.target.getAttribute("data-id");
    dispatch(claimTask({ taskId, userId }));
    setCheck(false);
    setTask(null);
  };

  //
  useEffect(() => {
    if (error !== null) {
      errorMsgs(error.err);
    } else if (success === "Claimed successfully") {
      successMsg(success);
      dispatch(fetchTasks());
      dispatch(getUser());
    }
    dispatch(clear());
  }, [success, error]);

  // Get User & Refs
  useEffect(() => {
    dispatch(fetchTasks());
    fetchuserId();
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  return (
    <div className="task">
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
                  <li>{task.description}</li>
                  <li>{task.points}</li>
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
                <li>{task.description}</li>
                <li>{task.points}</li>
              </ul>
              {!check ? (
                <a
                  href={task.link}
                  target="_blank"
                  className="btn"
                  onClick={(e) => {
                    setCheck(true);
                  }}
                >
                  Check
                </a>
              ) : (
                <div className="btn" data-id={task._id} onClick={claimtask}>
                  Claim
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Task;
