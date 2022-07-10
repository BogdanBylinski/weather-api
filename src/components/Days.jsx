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
      
      setMaxTemp(Math.max(...temp));
      setMinTemp(Math.min(...temp2))
  

    
    }
  },[city])
  const left = () => {
      if (minTemp &&
          
          (Math.floor(city.day.mintemp_c) - minTemp) !== 0
          ) {
        let range = (maxTemp - minTemp) / 10;
      let width =
        (Math.floor(city.day.mintemp_c) - minTemp) / range 
       return (Math.ceil(width)*2);
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
    let result =0
      if (maxTemp - Math.floor(city.day.maxtemp_c) > 0) {
        let range = (maxTemp - minTemp) / 10;
      let width = maxTemp - Math.floor(city.day.maxtemp_c) / range;
       result= Math.floor(width);
    } else if (
      
      maxTemp - Math.floor(city.day.maxtemp_c) <= 0
    ) {
       result = 0;
    }   
    return result*2
  };

  const position = () => {
   
      let range =
        ((today.current.temp_c - minTemp) / (maxTemp - minTemp / 10)) * 100;
       if(range<0){return 3
    }   
       else if(today.current.temp_c>maxTemp){return 96.5

    }   else
       return(Math.floor(range));
    
  };
  const color1 = ()=>{
      let color1 = '';
    //   let color2 = '';
      if(city.day.mintemp_c<=10 && city.day.mintemp_c >=0) {
           color1 = '#90ee90'
        }
        else if(city.day.mintemp_c<-10 && city.day.mintemp_c <0){
             color1 ='#3399FF'
        }
        else if(city.day.mintemp_c>10 && city.day.mintemp_c <=20){
             color1 ='#ffff00'
        }
        else if(city.day.mintemp_c>20 && city.day.mintemp_c <=30){
             color1 ='#FFA500'
        } 
       
        else if(city.day.mintemp_c>30 ){
             color1 ='#FF0000'
            //   color2 = '#990 099'
        }
      return color1
  }
  const color2 =()=>{
      let color2 =''
     if(city.day.maxtemp_c<-10 && city.day.maxtemp_c <0){
        color2 ='#90ee90'
   }
   else if(city.day.maxtemp_c<=0 && city.day.maxtemp_c <10){
        color2 ='#3399FF'
   }
   else if(city.day.maxtemp_c>=10 && city.day.maxtemp_c <20){
        color2 ='#ffff00'
   }
   else if(city.day.maxtemp_c>=20 && city.day.maxtemp_c <30){
        color2 ='#FFA500'
   }
   else if(city.day.maxtemp_c>=30 && city.day.maxtemp_c<40 ){
    color2 ='#FF0000'
   }
   else if(city.day.maxtemp_c>=40){
    color2 ='#CC00CC'
   }
   return color2
  }
  const gradient =()=>{
      return  `linear-gradient(90deg, ${color1()} 0%, ${color2()} 100%)`
  }
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
<div className="midLine"  style={{width: `${middle()}%`, background: `linear-gradient(90deg, ${color1()} 0%, ${color2()} 100%)`}}></div>
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
