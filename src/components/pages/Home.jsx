import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "../../assets/css/home.css";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";
import rock from "../../assets/images/rock.svg";
// import particle from "../../assets/images/particle.svg";
import { Link, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { getRandomInt } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { addPoint, getUser, updatePoints } from "../../redux/CoreMining";

function Home() {
  const MAX_SCORE = 2500;
  const dispatch = useDispatch();
  const { user, Userpoint } = useSelector((state) => state.CoreMining);
  const [score, setScore] = useState(MAX_SCORE);
  // const [points, setPoints] = useState(0);
  const [earnedPoint, setEarnedPoint] = useState(0);
  const coreContRef = useRef();
  const toolRef = useRef();
  const earnedpoint = useRef(earnedPoint);
  const { pathname } = useLocation();

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

  const createParticles = (e) => {
    const container = coreContRef.current;
    const particleCount = user ? (user.stage + 1) * 2 : 2; // Number of particles to create

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("img");
      particle.src = "./particle.svg";
      particle.className = "particle";
      container.appendChild(particle);

      // Randomize particle starting position
      const startX = e.clientX - container.offsetLeft + getRandomInt(-70, 70);
      const startY = e.clientY - container.offsetTop + getRandomInt(-70, 70);
      particle.style.left = startX + "px";
      particle.style.top = startY + "px";

      // Randomize particle movement direction
      const endX = startX + getRandomInt(-100, 100);
      const endY = startY + getRandomInt(-100, 100);

      // Animate particle
      setTimeout(() => {
        particle.style.transition = "left 0.5s, top 0.5s, opacity 0.5s";
        particle.style.left = endX + "px";
        particle.style.top = endY + "px";
        particle.style.opacity = 0;
      }, 500); // Start animation after a small delay

      // Remove particle after animation completes
      setTimeout(() => {
        particle.remove();
      }, 500); // Adjust timing based on animation duration and delay
    }
    const newScore = score - particleCount;
    setScore((prevCount) => prevCount - particleCount);
    // setPoints((prevPoints) => prevPoints + particleCount);
    localStorage.setItem(`${user.username}_tap`,earnedpoint.current + particleCount);
    dispatch(addPoint(particleCount));
    setEarnedPoint((prevPoints) => prevPoints + particleCount);
    if (user) {
      localStorage.setItem(`${user.username}_tapCount`, newScore.toString());
      localStorage.setItem(
        `${user.username}_lastUpdated`,
        Date.now().toString()
      );
    }
  };
  const RechargeTime = [
    1500, 1400, 1300, 1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
    100,
  ];

  // tappingCount Login
  useEffect(() => {
    if (user) {
      const MaxscoreStore = localStorage.getItem(`${user.username}_tapCount`);
      if (MaxscoreStore) {
        const storedTapCount = localStorage.getItem(
          `${user.username}_tapCount`
        );
        const storedLastUpdated = localStorage.getItem(
          `${user.username}_lastUpdated`
        );
        if (storedTapCount && storedLastUpdated) {
          const now = Date.now();
          const lastUpdated = parseInt(storedLastUpdated, 10);
          const elapsedTime = Math.floor(
            (now - lastUpdated) / RechargeTime[user.rechargeLvl]
          ); // Time in seconds
          // console.log(elapsedTime);
          let newTapCount = parseInt(storedTapCount, 10) + elapsedTime;
          if (newTapCount > MAX_SCORE) newTapCount = MAX_SCORE;

          setScore(newTapCount);
          localStorage.setItem(
            `${user.username}_tapCount`,
            newTapCount.toString()
          );
        }
      } else {
        const MaxscoreStore = localStorage.setItem(
          `${user.username}_tapCount`,
          score
        );
      }
    }
  }, [user]);

  // tappingCount Recovery
  useEffect(() => {
    if (user) {
      const time = RechargeTime[user.rechargeLvl];
      const storedScore = localStorage.getItem(`${user.username}_tapCount`);
      if (storedScore) {
        setScore(parseInt(storedScore, 10));
      } else {
        localStorage.setItem(`${user.username}_tapCount`, "0");
      }

      const incrCount = (user.stage + 1) * 2;
      const interval = setInterval(() => {
        setScore((prevCount) => {
          // console.log(prevCount>=MAX_SCORE);
          if (prevCount >= MAX_SCORE) {
            return MAX_SCORE; // Ensure score doesn't exceed MAX_SCORE
          } else {
            const newCount = prevCount + incrCount;
            localStorage.setItem(
              `${user.username}_tapCount`,
              newCount.toString()
            );
            localStorage.setItem(
              `${user.username}_lastUpdated`,
              Date.now().toString()
            );
            return newCount;
          }
        });
      }, time); // Adjust interval timing as needed
      return () => clearInterval(interval); // Cleanup function to clear interval on unmount
    }
  }, [user]);

  // Tool follow
  const handleMouseMove = (e) => {
    const container = coreContRef.current;
    const tool = toolRef.current;

    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    tool.style.left = mouseX + "px";
    tool.style.top = mouseY + "px";
  };

  useEffect(() => {
    const container = coreContRef.current;

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Get  user
  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
   if (user) {
    const unsaved = localStorage.getItem(`${user.username}_tap`);
    if (unsaved) {
      console.log(Number(unsaved));
      dispatch(updatePoints({earnedPoint:Number(unsaved)}));
      localStorage.removeItem(`${user.username}_tap`);
    }
   }
  }, [user]);

  // save earnedPoint state value to ref
  useEffect(() => {
    earnedpoint.current = earnedPoint;
  }, [earnedPoint]);

  // Update points on unmount
  useEffect(() => {
    return () => {
      if (earnedpoint.current > 0) {
        dispatch(updatePoints({ earnedPoint: earnedpoint.current }));
        // dispatch(getUser());
      }
    };
  }, []);


  return (
    <div className="home">
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
      <div className="coreCont" ref={coreContRef} onClick={createParticles}>
        <img src={rock} alt="rock" className="core" />
        {/* <img src={particle} alt="particle" className="particle" /> */}
        {user && (
          <img
            src={stageImg[user.stage]}
            alt={stages[user.stage]}
            className="tool"
            ref={toolRef}
          />
        )}
      </div>
      <div className="progressCont">
        <h4>
          <span>{score}</span>/<span>{MAX_SCORE}</span>
        </h4>
        <div className="progressBarCont">
          <div
            className="progressBar"
            style={{ width: `${(score / MAX_SCORE) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
