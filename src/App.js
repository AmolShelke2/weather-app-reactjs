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
  const [location, setLocation] = useState("Nagpur");

  // Fetch the weather data

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?&q=${location}&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  // Show loader if data is wrong
  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner8 className="text-5x1 animate-spin" />
        </div>
      </div>
    );
  }

  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div
      className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover 
    bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {/* form */}
      <form>form</form>
      {/* card */}
      <div
        className="w-full  max-w-[450px] bg-black/20 min-h-[584px]
       text-white backdrop-blur-[32px] py-12 px-6 rounded-[15px]">
        <div>
          {/* card top */}
          <div>
            {/* icon */}
            <div className="text-[87px]">{icon}</div>
            <div>
              {/* country name */}
              <div className="text-2x1 font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1} /{" "}
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>
          {/* card body */}
          <div>Card body</div>
          {/* card  bottom*/}
          <div>card bottom</div>
        </div>
      </div>
    </div>
  );
};

export default App;

// styling card component
