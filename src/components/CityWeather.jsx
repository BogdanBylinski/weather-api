import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../sass/CityWeather.scss'
import dayFull from "../assets/img/dayFull.png";
import night from "../assets/img/night.png";

function CityWeather() {
    const [city, setCity] = useState('')


    let params = useParams()


    useEffect(()=>{
        getCityWeather(params.name)
    },[params])

    const getCityWeather =(params)=>{
        axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=f1a889498689468fba864916221906&q=${params}&days=10&aqi=no&alerts=no`
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
    
  return (
    <div className='main'  style={{ backgroundImage: `url(${dayOrNight()})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>CityaWeather</div>
  )
}

export default CityWeather