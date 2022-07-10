import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../sass/CityWeather.scss'
import dayFull from "../assets/img/dayFull.png";
import night from "../assets/img/night.png";
import { GiWaterDrop } from "react-icons/gi";
import { WiDaySunny } from "react-icons/wi";
import { WiSunset } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiBarometer } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import Compass from '../assets/img/compass.png';
import HourlyForecast from './HourlyForecast';
import Days from './Days';

function CityWeather() {
    const [city, setCity] = useState('')
    const radius = 50
    const [maxTemp, setMaxTemp] = useState(0)
    const [minTemp, setMinTemp] = useState(0)
    // const [leftLine, setLeftLine] = useState(0)
    // const [rightLine, setRightLine] = useState(0)
    // const [midLine, setMidLine] = useState(0)
    // const [positionCircle, setPositionCircle] = useState(0)

    let params = useParams()


    useEffect(()=>{ 
        getCityWeather(params.name)
    },[params])

    const getCityWeather =(params)=>{
        axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=f1a889498689468fba864916221906&q=${params}&days=10&aqi=no&alerts=no`
        )
        .then((res) => {
          console.log(res.data);
          setCity(res.data);
        
        })
        .catch((err) => console.log(err));
     
    }
    const dayOrNight = () => {
        
        if (city &&
          city.current.condition.icon
            .split("//cdn.weatherapi.com/weather/64x64/")[1]
            .split("/")[0] === "night"
        ) {
          return night;
          
        } else {
          return dayFull;
        }
      };
      const windDir =['NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW','N']
      const uvIndex = ['Low', 'Low', 'Moderate','Moderate','Moderate','High','High','Very High','Very High','Very High','Extreme']
      const uvIndexBar = ()=>{
        if (city && city.current.uv > 10){
          return (95);
        }
          else if (city ){

            return(city.current.uv * 10 - 5)

          }
        }
        // const getDayName = (forecastday) =>{
        //   let date = new Date(forecastday);
        //   let day = date.toLocaleString('en-us', {weekday: 'short'});
        //   return day
        // }
        // useEffect(()=>{
        //   if (city){ 
        //     let temp =[] 
        //     let temp2 =[]
        //     city.forecast.forecastday.map(i => (temp.push(Math.floor(i.day.maxtemp_c))))
        //     city.forecast.forecastday.map(i => (temp2.push(Math.floor(i.day.mintemp_c))))
            
        //     console.log(Math.max(...temp), 'hid');
        //     console.log(Math.min(...temp2), 'hidd');
        //     setMaxTemp(Math.max(...temp));
        //     setMinTemp(Math.min(...temp2))
          
        //   }
        // },[city])
        

        // const left =()=>{
        // let range=  (maxTemp-minTemp)/10
        // if( city && Math.floor(city.forecast.forecastday[0].day.mintemp_c)-minTemp !== 0  ){
          
        //   let width =(Math.floor(city.forecast.forecastday[0].day.mintemp_c)-minTemp)/range
        //   return  setLeftLine(Math.ceil(width))
        //   }
        //   else if (city && Math.floor(city.forecast.forecastday[0].day.mintemp_c)-minTemp === 0 ){

        //     return  setLeftLine(0)
        //   }
        // }
        //   const middle =()=>{
        //     let width = 100 - leftLine - rightLine
        //     return setMidLine(width)
        //   }
        // const right =()=>{
        // let range=  (maxTemp - minTemp)/10
        //   if(city && maxTemp-Math.floor(city.forecast.forecastday[0].day.maxtemp_c) !== 0){

        //     let width =(maxTemp - Math.floor(city.forecast.forecastday[0].day.maxtemp_c)/range)
        //     return  setRightLine(Math.floor(width))
        //   } 
        //   else if (city && maxTemp-Math.floor(city.forecast.forecastday[0].day.maxtemp_c) === 0 ){

        //     return  setRightLine(0)
        //   }
        // }

        // const position =()=>{
        //   if(city){
        //     let range =  (city.current.temp_c - minTemp) / (maxTemp - minTemp /10)*100
        //     return setPositionCircle(Math.floor(range)) 
        //   }
        // }

  return city ? (
    <div className='main'  style={{ backgroundImage: `url(${dayOrNight()})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
      <div className="oneCity__top">
        <div className="oneCity__top-city">{city.location.name}</div>
        <div className="oneCity__top-temp">{Math.floor(city.current.temp_c)}<span>&#xb0;</span></div>
        <div className="oneCity__top-bottom">
        <div className="oneCity__top-bottom-weather">{city.current.condition.text}</div>
        <div className="oneCity__top-bottom-HL">H:{city.forecast.forecastday[0].day.maxtemp_c}
              <span>&#xb0;</span> L:{city.forecast.forecastday[0].day.mintemp_c}
              <span>&#xb0;</span></div>
        </div>
      </div>
        <div className="oneCity__grid_hourly">
        <div className="oneCity__forecast-top">
            <AiOutlineClockCircle/> 24 hours forecast
          </div>
          <HourlyForecast city={city} maxTemp = {maxTemp} minTemp={minTemp} ></HourlyForecast>
        </div>
        <div className="oneCity__forecast">
          <div className="oneCity__forecast-top">
            <BsCalendar3/> 3-Day forecast
          </div>
          <div className="oneCity__forecast-body"></div>
            {city.forecast.forecastday.map((e, index)=><Days key={index} city={e} today={city}></Days>)
}
        </div>
      <div className="oneCity__grid">
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-uv">
            <div className="item__row-top">
             <WiDaySunny/> UV INDEX
            </div>
            <div className="item__row-body">
              {city.current.uv}
            <span>{uvIndex[city.current.uv-1]}</span>
            </div>
            <div className="uvIndexBar">
              <div className="uvBig"></div>
              <div className="uvSmall" style={{left: `${uvIndexBar()}%`}}></div>
            </div>
            <div className="item__row-footer">
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        </div>
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-sunset">
          <div className="item__row-top">
             <WiSunset/> Sunset
            </div>
            <div className="item__row-body">
              {(+(city.forecast.forecastday[0].astro.sunset).split(' ')[0].split(':')[0])+12}:
              {(city.forecast.forecastday[0].astro.sunset).split(' ')[0].split(':')[1]}
            </div>
            <div className="item__row-footer">
              Lorem ipsum dolor sit amet.
            </div>
          </div>
        </div>
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-wind">
          <div className="item__row-top">
              <WiStrongWind/> Wind
            </div>
            <div className="item__row-wind-body" style={{backgroundImage:`url(${Compass})`}}>
              <div className="windArrow" style={{transform: `rotateZ(${(windDir.indexOf(city.current.wind_dir)+1)*22.5/2}deg)`}}></div>
              <div className="windSpeed">{city.current.wind_kph}<span>km/h</span></div>
            </div>
          </div>
        </div>
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-totalPrecip">
          <div className="item__row-top">
            <GiWaterDrop/>  Rainfall
            </div>
            <div className="item__row-rain-body">
              {city.current.precip_mm} <span>mm</span>
            </div>
          </div>
        </div>
        <div className="oneCity__grid-item">
        <div className="oneCity__grid-item-feelsLike">
        <div className="item__row-top">
             <WiThermometer/> Feels like
            </div>
        </div>
        </div>
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-humidity">
          <div className="item__row-top">
             <WiHumidity/> Humidity
            </div>
            <div className="item__row-body">
            {/* <div class="gauge">
  <div class="gauge__body">
    <div class="gauge__fill" style={{transform: `rotate(${city.current.humidity/100 / 2}turn)`}}></div>
    <div class="gauge__cover">{city.current.humidity}%</div>
  </div> */}
  <div id="wrapper">
    <svg id="meter">
    <circle id="outline_curves" r={radius} cx="50%" cy="50%" stroke="#999"
strokeWidth="8" strokeDasharray={`${radius*Math.PI}, ${radius*Math.PI*2}`} fill="none">
</circle>
    <circle id="low" r={radius} cx="50%" cy="50%" stroke="#fff"
strokeWidth="6" strokeDasharray={`${radius*Math.PI}, ${radius*Math.PI*2}`} fill="none">
</circle>
<circle id="mask" r={radius} cx="50%" cy="50%" stroke="#999"
strokeWidth="6" strokeDasharray={`${radius*Math.PI / (100/(100-city.current.humidity))}, ${radius*Math.PI*2}`} fill="none">
</circle>
<circle id="outline_ends" r={radius} cx="50%" cy="50%" stroke="#999"
strokeWidth="8" strokeDasharray={`2, ${radius*Math.PI*2}`} fill="none">
</circle>
    </svg>
    <div className="humidity">{city.current.humidity} %</div>
</div>

</div>
            {/* </div> */}
          </div>
        </div>
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-visibility">
          <div className="item__row-top">
             <MdOutlineVisibility/> Visibility
            </div>
            <div className="item__row-body">
              
            </div>
          </div>
        </div>
        <div className="oneCity__grid-item">
          <div className="oneCity__grid-item-pressure">
          <div className="item__row-top">
             <WiBarometer/> Pressure
            </div>
            <div className="item__row-body">
              {city.current.pressure_mb} <span>hpa</span>
            </div>
          </div>
        </div>

      </div>


    </div>
  ):('')
}

export default CityWeather
