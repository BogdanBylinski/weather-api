import React, { useEffect, useState } from "react";
function Days({ city, today }) {
  const [maxTemp, setMaxTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [leftLine, setLeftLine] = useState();
  const [rightLine, setRightLine] = useState();
  const [midLine, setMidLine] = useState();
  const [positionCircle, setPositionCircle] = useState(0);
  const [day, setDay]=useState('')
//   const [dayNow, setDayNow]=useState('')
  let dayNow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()]
  console.log(city);
  console.log(today);
  console.log(minTemp);
  console.log(maxTemp);
  
  const getDayName = (forecastday) =>{
    let date = new Date(forecastday);
    let day = date.toLocaleString('en-us', {weekday: 'short'});
    
    return day
  }

//   useEffect(() => {
//     if (city && minTemp&&  maxTemp) {
//         setMaxTemp(maxas)
//         setMinTemp(minas)
//     }
//   }, [city, minas, maxas]);
useEffect(()=>{
    if (city){ 
      let temp =[] 
      let temp2 =[]
      today.forecast.forecastday.map(i => (temp.push(Math.floor(i.day.maxtemp_c))))
      today.forecast.forecastday.map(i => (temp2.push(Math.floor(i.day.mintemp_c))))
      
      console.log(Math.max(...temp), 'hid');
      console.log(Math.min(...temp2), 'hidd');
      setMaxTemp(Math.max(...temp));
      setMinTemp(Math.min(...temp2))
  

    
    }
  },[city])
  const left = () => {
      console.log(Math.floor(city.day.mintemp_c) - minTemp );
      console.log(maxTemp);
      console.log(minTemp);
      if (minTemp &&
          
          (Math.floor(city.day.mintemp_c) - minTemp) !== 0
          ) {
        let range = (maxTemp - minTemp) / 10;
      let width =
        (Math.floor(city.day.mintemp_c) - minTemp) / range 
       return (Math.ceil(width));
    } else if (
      
      Math.floor(city.day.mintemp_c) - minTemp === 0 
    ) {
       return (0);
    }
  };
  const middle = () => {
    let width = 100 - left() - right() ;
     return (width);
  };
  const right = () => {

    let range = (maxTemp - minTemp) / 10;
    console.log(range);
    console.log(maxTemp);
    if (
      
      maxTemp - Math.floor(city.day.maxtemp_c) !== 0
    ) {
      let width = maxTemp - Math.floor(city.day.maxtemp_c) / range;
       return (Math.floor(width));
    } else if (
      
      maxTemp - Math.floor(city.day.maxtemp_c) === 0
    ) {
       return (0);
    }
  };

  const position = () => {
   
      let range =
        ((today.current.temp_c - minTemp) / (maxTemp - minTemp / 10)) * 100;
       return(Math.floor(range));
    
  };
  return city ? <>
  <div className="oneCity__forecast-body-item">
  <div className="oneCity__forecast-body-item-day">
  {city.date === today.current.last_updated.split(' ')[0]? 'Today':getDayName(city.date)}</div>
  <div className="oneCity__forecast-body-item-clouds">
    <img src={city.day.condition.icon} alt="icon" />
   <span>
     {city.day.daily_will_it_rain === 1? `${city.day.daily_chance_of_rain}%` : ''
}
     </span> 
  </div>
  <div className="oneCity__forecast-body-item-temps">
    <span>{Math.floor(city.day.mintemp_c)}<span>&#xb0;</span></span>
    <div className="mainLine">

<div className="leftLine" style={{width: `${left()}%`}}></div>
<div className="midLine" style={{width: `${middle()}%`}}></div>
<div className="rightLine" style={{width: `${right()}%`}}></div>
{

city.date === today.current.last_updated.split(' ')[0]?
<div className="greyCircle" style={{left: `${position()}%`}} >
  <div className="whiteCircle"></div>
</div>:''
}


</div>
    <span>{Math.floor(city.day.maxtemp_c)}<span>&#xb0;</span></span>
  </div>
  </div>
 
  </>:''
}

export default Days;
