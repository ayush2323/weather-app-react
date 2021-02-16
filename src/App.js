import React, { useState, useEffect, useRef } from 'react';
import ShowTemperature from './ShowTemperature'
import './App.css';

function App() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("Get Output Here")
  const [hideClass, setHideClass] = useState("data_hide")
  const [temperature, setTemperature] = useState(0)
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [color, setColor] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  const eventChange = (event) => {
    setInput(event.target.value)
  }

  const getCurrentDay = () => {
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let days = weekday[currentTime.getDay()];
    setDay(days)
  }

  const getCurrentTime = () => {
    let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
    ];

    let now = new Date();
    let month = months[now.getMonth()];
    let date = now.getDate();
    setDate(`${date} ${month}`)
  };

  useEffect(() => {
    getCurrentDay()
    getCurrentTime()
  }, [])

  useEffect(() => {
    inputRef.current.focus()
  }, [loading])

  const getInfo = async (event) => {
    event.preventDefault()
    if(input === "") {
      setOutput("Please write the name before you search")
      setHideClass("data_hide")
    } else {
      setLoading(true)
      try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=7d276015941d7127fb5fc5b290907321`
        const response = await fetch(url)
        console.log(response)
        const data = await response.json()
        const arrData = [data]
        setOutput(`${arrData[0].name},${arrData[0].sys.country}`)
        setTemperature(arrData[0].main.temp)
        let tempMood = arrData[0].weather[0].main
        if (tempMood === "Clear") {
          setWeather('sun')
          setColor('#eccc68')
        } else if (tempMood === "Rain") {
          setWeather('rain')
          setColor('#a4b0be')
        } else {
          setWeather('cloud')
          setColor('#f1f2f6')
        }
        setHideClass("")
        setInput("")
      } catch {
        setOutput("Please enter the city name properly")
        setHideClass("data_hide")
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="container-fluid main_header">
        <div className="row">
            <div className="col-md-10 col-12 mx-auto">
                <div className="main_content">
                  <h1>Weather App</h1>
                    <form className="temp_form">
                        <input ref={inputRef} value={input} type="text" name="" id="cityName" placeholder="Enter Your City Nmae" autoComplete="off" onChange={eventChange} />
                        <input type="submit" value="Search" id="submitBtn" onClick={getInfo} />
                    </form>
                </div>
                <ShowTemperature day={day} date={date} output={output} hideClass={hideClass} temperature={temperature} weather={weather} color={color} loading={loading} />
            </div>
        </div>
    </div>
  );
}

export default App;
