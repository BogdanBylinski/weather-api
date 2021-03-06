import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityWeather from "./components/CityWeather";
import Home from "./components/Home";

function App() {
  return (<>
   <BrowserRouter>
      <Routes>
      <Route index element={<Home></Home>}></Route>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/weather-api" element={<Home></Home>}></Route>
      <Route path="/weather-api/city/:name" element={<CityWeather></CityWeather>}></Route>

      </Routes>
      {/* <Home></Home> */}
    </BrowserRouter>
  </>
  );
}

export default App;
