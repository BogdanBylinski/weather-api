import axios from "axios";
import { React, useEffect, useState } from "react";
import "../sass/MiniCitys.scss";
import day from "../assets/img/day.png";
import night from "../assets/img/night.png";
import { useNavigate } from "react-router-dom";

function MiniCity({ prop, dots, setList, list }) {
  const [city, setCity] = useState("");
  const [deleteButton, setDeleteButton] = useState("deleteDisabled");
  const [time, setTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState("");
  const [update, setUpdate] = useState(Date.now());
  const [laikas, setLaikas] = useState("");
  const [minutes, setMinutes] = useState(0)

  const tick = () => {
    const m = new Date();
    const s = m.getSeconds();
    const minute = m.getMinutes()
    setMinutes(minute)
    setLaikas(s);
    if (laikas === 0) {
      setUpdate(Date.now());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);
    //   const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [laikas]);

  useEffect(() => {
    dots === 1
      ? setDeleteButton("deleteActive")
      : setDeleteButton("deleteDisabled");
  }, [dots]);
  useEffect(() => {
    dots === 1
      ? setDeleteButton("deleteActive")
      : setDeleteButton("deleteDisabled");
    if (prop) {
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=f1a889498689468fba864916221906&q=${prop}&days=1&aqi=no&alerts=no`
        )
        .then((res) => {
          console.log(res.data);
          setCity(res.data);
          setUpdate(Date.now());
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop, time, minutes]);
  useEffect(() => {
    if (city || laikas === 0) {
      axios
        .get(`https://worldtimeapi.org/api/timezone/${city.location.tz_id}`)
        .then((res) => {
          setCurrentTime(
            res.data.datetime.split("T")[1].split(".")[0].split(":")
          );
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop, time, update]);

  const remove = (e) => {
    // e.nativeEvent.stopImmediatePropagation();
    // e.stopPropagation()
    const newList = list.filter((cities) => cities !== e);
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };
  const dayOrNight = () => {
    if (
      city.current.condition.icon
      .split("//cdn.weatherapi.com/weather/64x64/")[1]
      .split("/")[0] === "night"
      ) {
        return night;
      } else {
        return day;
      }
    };
    
    const navigate = useNavigate()
    const navigation =(e)=>{
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation()
    
    navigate('/weather-api/city/'+ city.location.name)
  }
  return city ? (
    <>
    <div className="city__holder">

      <div className="miniCity" >
        
        <div
          className="city__block" onClick={(e)=>navigation(e)}
          style={{ background: `url(${dayOrNight()})` }}
        >
          {/* <div
            className={deleteButton}
            onClick={(e) => remove(city.location.name)}
          >
            <div
              className="delete"
              onClick={(e) => remove(city.location.name)}
            ></div>
          </div> */}
          <div className="city__block_item">
            <div className="city__block_item-big">
              {city.location.name}
              <span>
                {currentTime[0]}:{currentTime[1]}
              </span>
            </div>
            <div className="city__block_item-temp">
              {Math.floor(city.current.temp_c)}
              <span>&#xb0;</span>
            </div>
          </div>
          <div className="city__block_item">
            <div className="city__block_item-small">
              {city.current.condition.text}
            </div>
            <div className="city__block_item-small">
              H:{Math.floor(city.forecast.forecastday[0].day.maxtemp_c)}
              <span>&#xb0;</span> L:{Math.floor(city.forecast.forecastday[0].day.mintemp_c)}
              <span>&#xb0;</span>
            </div>
          </div>
        </div>
      </div>
      <div
            className={deleteButton}
            onClick={(e) => remove(city.location.name)}
          >
            <div
              className="delete"
              onClick={(e) => remove(city.location.name)}
            ></div>
          </div>
    </div>

    </>
  ) : (
    ""
  );
}

export default MiniCity;
