import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CityWeather from "./components/CityWeather";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Home ></Home>}></Route>
      <Route path="/" element={<Home ></Home>}></Route>
      <Route path="/home" element={<Home ></Home>}></Route>
      <Route path="/city/:name" element={<CityWeather></CityWeather>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
