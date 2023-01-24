import React, { useState, useEffect } from "react";

// import axios
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";

// API key
const APIkey = `92e5fe71edba4a5e83a4adceb8e724df`;

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Mumbai");

  // Fetch the weather data

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?&q=${location}&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  return (
    <div className="App">
      <p>Creating Weather App</p>
    </div>
  );
};

export default App;
