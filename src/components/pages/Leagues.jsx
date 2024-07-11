import React, { useState } from "react";
import "../../assets/css/leagues.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import novice from "../../assets/images/novice.svg";
import experience from "../../assets/images/experience.svg";
import Journeyman from "../../assets/images/Journeyman.svg";
import Master from "../../assets/images/Master.svg";
import Veteran from "../../assets/images/Veteran.svg";

function Leagues() {
  const [stages, setStages] = useState([
    "Novice",
    "Experienced",
    "Journeyman",
    "Master",
    "Veteran",
  ]);
  const [prices] = useState([
    100000,
    1000000,
    5000000,
    10000000,
    100000000
  ]);
  const [stageImg, setStageImg] = useState([
    novice,
    experience,
    Journeyman,
    Master,
    Veteran,
  ]);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIdx(swiper.activeIndex);
  };

  return (
    <div className="leagues">
        <h1>{stages[activeIdx]}</h1>
        <h2>Equip your Equipement to Go up the league and mine more</h2>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        className="slider"
        // pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <img src={stageImg[0]} alt={stages[0]} className="icon"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={stageImg[1]} alt={stages[1]} className="icon"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={stageImg[2]} alt={stages[2]} className="icon"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={stageImg[3]} alt={stages[3]} className="icon"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src={stageImg[4]} alt={stages[4]} className="icon"/>
        </SwiperSlide>
      </Swiper>
      <h3>{prices[activeIdx]}</h3>
    </div>
  );
}

export default Leagues;
