import axios from 'axios';
import { useEffect, useState } from 'react';
import '../App.css';
import MiniCity from '../components/MiniCity';
import '../sass/Main.scss'


function Home() {
  const [search, setSearch] = useState('')
  const [cities, setCities] = useState('')
  const [list, setList] = useState([])
  const [ip,setIP] = useState('');
  const [dots, setDots]= useState(0)
  
  const getData = async()=>{
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.city)
}
const menu =()=>{
  if(list.length>=1){

    dots === 0 ? setDots(1):setDots(0)
  }
  else{
    setDots(0)
  }
  console.log(dots);
}

useEffect(()=>{
    getData()
},[])
useEffect(()=>{
  if(list.length>=1){

    dots === 1 ? setDots(1):setDots(0)
  }
  else{
    setDots(0)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[list])

  console.log(typeof cities);
const s =(e)=>{
  console.log(e.target.value);
  setSearch(e.target.value)
  if(search.length<2){
    setCities('')
  }
find()
}
  const find = async (e)=>{
    if(search.length>=3){
   await axios
   .get(`https://api.weatherapi.com/v1/search.json?key=f1a889498689468fba864916221906&q=${search}`)
   .then((res) => {
     console.log(res.data);
     setCities(res.data)
     console.log(cities, 'miestai');
    })}
  }
  useEffect(()=>{
    let data = localStorage.getItem('list');
    if(data === null){
      localStorage.setItem('list', JSON.stringify([]))
      setList([])
    }
    else{
      setList(JSON.parse(data))
    }
  },[])
  const add =(e)=>{
    console.log(e.target.innerHTML);
    setList(list=>[...list, e.target.innerHTML])
    const data = [...list, e.target.innerHTML]
    localStorage.setItem('list', JSON.stringify(data))
  }

  return (
    <div className="App" onClick={()=>{setCities(''); setSearch('')}}>
      <div className="top">

      <input  type="text" value={search} name="" id="input" onChange={(e)=> s(e)} placeholder='Search for a city' />
      <div className="menu">
        <div onClick={()=>menu()} className="dots">...</div>
        </div>
      </div>
      <div className="cities__container">

      
      {
        typeof cities !== 'string' ? 

        <div className="cities__block">
      {cities.map((c, i)=>
          <div className='cities__block-item' key={c.id} onClick={(e)=> add(e)} >
            {c.name}
          </div>
        )}</div>:''
        
      }
      </div>
      <div className="city__container">

      <MiniCity prop={ip}></MiniCity>
      {
        list.length>=1? list.map((c,i)=>
        <MiniCity key={i} list={list} setList={setList} dots={dots} prop={c}></MiniCity>
        ):''
      }
      </div>
    </div>
  );
}

export default Home;
