import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
// import "swiper/css/pagination";

import "../sass/CityWeather.scss";

// import required modules
import { FreeMode } from "swiper";

export default function HourlyForecast(city) {
  const [daysArr, setDaysArr] = useState([])
  let day=0
  // const temp= [city.city.current];
  const temp= [];
  useEffect(()=>{
    if(daysArr.length<23)
    city.city.forecast.forecastday[0].hour.map(i=>
      i.time_epoch > city.city.current.last_updated_epoch? temp.push(i) : ''
    )
    while (temp.length<23){
      
      temp.push(city.city.forecast.forecastday[1].hour[day])
      day++
     }
     setDaysArr(old => [...old, ...temp])
  },[])
  console.log(daysArr);
  
  
  return (
    <>
      <Swiper
        slidesPerView={5.6}
        spaceBetween={0}
        freeMode={true}
       
        modules={[FreeMode]}
        className="mySwiper"
      >
        <SwiperSlide>{
          <div className="hourly__row">
            <div className="hourly__row-item">Now</div>
            <div className="hourly__row-item"><img src={`${city.city.current.condition.icon}`} alt="" /></div>
            <div className="hourly__row-item"><div className="temp">{city.city.current.temp_c}<span>&#xb0;</span></div></div>
          </div>

          }</SwiperSlide>
        {daysArr.map((i, index) =>
          <SwiperSlide key={index}>
            <div className="hourly__row">
            <div className="hourly__row-item">{i.time.split(' ')[1].split(':')[0]}</div>
            <div className="hourly__row-item"><img src={`${i.condition.icon}`} alt="" /></div>
            <div className="hourly__row-item"><div className="temp">{Math.floor(i.temp_c)}<span>&#xb0;</span></div></div>
          </div>

          </SwiperSlide>
          )}
  
      </Swiper>
    </>
  );
}
