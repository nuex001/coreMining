import React, { useEffect, useRef, useState } from "react";
import  "../../assets/css/home.css";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";
import rock from "../../assets/images/rock.svg";
// import particle from "../../assets/images/particle.svg";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { getRandomInt } from "../../utils/utils";
function Home() {
  const MAX_SCORE = 2500;
  const [score, setScore] = useState(MAX_SCORE);
  const [points, setPoints] = useState(2000000);
  const coreContRef = useRef();
  const toolRef = useRef();
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
    const particleCount = 2; // Number of particles to create

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
    setPoints((prevPoints) => prevPoints + particleCount);
  };

  // tappingCount Login
  useEffect(() => {
    const storedTapCount = localStorage.getItem(`${"emma"}_tapCount`);
    const storedLastUpdated = localStorage.getItem(`${"emma"}_lastUpdated`);

    if (storedTapCount && storedLastUpdated) {
      const now = Date.now();
      const lastUpdated = parseInt(storedLastUpdated, 10);
      const elapsedTime = Math.floor((now - lastUpdated) / MAX_SCORE); // Time in seconds
      let newTapCount = parseInt(storedTapCount, 10) + elapsedTime;
      if (newTapCount > MAX_SCORE) newTapCount = MAX_SCORE;

      setScore(newTapCount);
      localStorage.setItem(`${"emma"}_tapCount`, newTapCount.toString());
    }
  }, []);

  // tappingCount
  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prevCount) => {
        const newCount = prevCount < MAX_SCORE ? prevCount + 1 : prevCount;
        localStorage.setItem(`${"emma"}_tapCount`, newCount.toString());
        localStorage.setItem(`${"emma"}_lastUpdated`, Date.now().toString());
        return newCount;
      });
    }, MAX_SCORE);

    return () => clearInterval(interval);
  }, []);

  // Tool follow
  useEffect(() => {
    const container = coreContRef.current;
    const tool = toolRef.current;
    container.addEventListener("mousemove", function (e) {
      // console.log(tool);
      // Adjust tool position relative to container
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      // Update tool position
      tool.style.left = mouseX + "px";
      tool.style.top = mouseY + "px";
    });
  }, []);
  return (
    <div className="home">
      <div className="txHeader">
        <h1>{points}</h1>
        <Link to="/league" className="stage">
          <img src={stageImg[0]} alt={stages[0]} />
          <h2>{stages[0]}</h2>
          <MdKeyboardDoubleArrowRight className="icon" />
        </Link>
      </div>
      <div className="coreCont" ref={coreContRef} onClick={createParticles}>
        <img src={rock} alt="rock" className="core" />
        {/* <img src={particle} alt="particle" className="particle" /> */}
        <img src={stageImg[0]} alt={stages[0]} className="tool" ref={toolRef} />
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
