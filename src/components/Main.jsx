import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityWeather from "./CityWeather";
import Home from "./Home";

function Main() {
  return (
    <>.
    <BrowserRouter>
      <Routes>
      <Route index element={<Home ></Home>}></Route>
      <Route path="/" element={<Home ></Home>}></Route>
      <Route path="/home" element={<Home ></Home>}></Route>
      <Route path="/city/:name" element={<CityWeather></CityWeather>}></Route>

      </Routes>
      <Home></Home>
    </BrowserRouter>
    </>
  );
}

export default Main;
