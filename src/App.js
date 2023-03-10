import React, { useState, useEffect } from 'react';

// import axios
import axios from 'axios';

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

// API key
const APIkey = `92e5fe71edba4a5e83a4adceb8e724df`;

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Nagpur');
  const [weatherInput, setWeatherInput] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // weather input handler
  const weatherInputHandler = e => {
    setWeatherInput(e.target.value);
  };

  // Weather input submission
  const weatherSubmitHandler = e => {
    // if input is valid
    if (weatherInput !== '') {
      setLocation(weatherInput);
    }

    // Select input
    const input = document.querySelector('input');

    // clear input
    input.value = '';

    // if weather input value is empty
    if (input.value === '') {
      setAnimate(true);

      // set animate to false after 500 ms
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    // prevent default
    e.preventDefault();
  };

  // Fetch the weather data
  useEffect(() => {
    // set loading to true
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?&q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then(res => {
        // set the data after 1500 ms
        setTimeout(() => {
          setData(res.data);

          // set loading to false
          setLoading(false);
        }, 1500);
      })
      .catch(err => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  // error message
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);

    // clear timer
    return () => clearTimeout(timer);
  }, [errorMsg]);

  // Show loader if data is wrong
  if (!data) {
    return (
      <div>
        <div
          className="w-full h-screen flex flex-col justify-center items-center 
          bg-gradientBg bg-no-repeat bg-cover bg-center"
        >
          <ImSpinner8 className="text-white text-5xl animate-spin" />
        </div>
      </div>
    );
  }

  // set the icon according to the weather
  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy />;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />;
      break;
    case 'Rain':
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case 'Clear':
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case 'Snow':
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />;
      break;
  }

  // date object
  const date = new Date();

  return (
    <div
      className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover 
    bg-center flex flex-col items-center justify-center px-4 lg:px-0"
    >
      {errorMsg && (
        <div
          className="w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c]
         text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md"
        >{`${errorMsg.response.data.message}`}</div>
      )}
      {/* form */}
      <form
        onSubmit={weatherSubmitHandler}
        className={`${
          animate ? 'animate-shake' : 'animate-none'
        } h-16 bg-black/30 w-full max-w-[450px] rounded-full
       backdrop-blur-[32px] mb-8`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            type="text"
            onChange={weatherInputHandler}
            placeholder="search by city or country"
            className="flex-1 bg-transparent outline-none placeholder:text-white placeholder:capitalize
              text-white text-[15px] p-6 h-full font-light"
          />
          <button
            onSubmit={weatherSubmitHandler}
            className="bg-[#1ab8ed] hover:bg-[#15bbdd] w-20 h-12 rounded-full flex justify-center
           items-center transition"
          >
            <IoMdSearch className="text-2x1 text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div
        className="w-full  max-w-[450px] bg-black/20 min-h-[584px]
       text-white backdrop-blur-[32px] py-12 px-6 rounded-[20px]"
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-5xl animate-spin" />
          </div>
        ) : (
          <div>
            {/* card top */}
            <div className="flex items-center gap-x-5">
              {/* icon */}
              <div className="text-[87px]">{icon}</div>
              <div>
                {/* country name */}
                <div className="text-2x1 font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                {/* date */}
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                {/* temp */}
                <div className="text-[144px] leading-none font-normal">
                  {parseInt(data.main.temp)}
                </div>
                {/* celcius icon*/}
                <div className="text-[40px]">
                  <TbTemperatureCelsius />
                </div>
              </div>
              {/* weather description */}
              <div className="capitalize text-center">
                {data.weather[0].description}
              </div>
            </div>
            {/* card  bottom*/}
            <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{' '}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like{' '}
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity
                    <span className="ml-2">{data.main.humidity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div className="ml-2">
                    Wind <span>{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
