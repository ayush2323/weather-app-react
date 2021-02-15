import React, { useState, useEffect} from 'react';
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

  const getInfo = async (event) => {
    event.preventDefault()
    if(input === "") {
      setOutput("Please write the name before you search")
      setHideClass("data_hide")
    } else {
      try {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=` + input + `&units=metric&appid=7d276015941d7127fb5fc5b290907321`
        const response = await fetch(url)
        const data = await response.json()
        const arrData = [data]
        setOutput(`${arrData[0].name},${arrData[0].sys.country}`)
        setTemperature(arrData[0].main.temp)
        let tempMood = arrData[0].weather[0].main
        if (tempMood === "Clear") {
          setWeather('sun')
          setColor('#eccc68')
        } else if (tempMood === "Clouds") {
          setWeather('cloud')
          setColor('#f1f2f6')
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
                        <input value={input} type="text" name="" id="cityName" placeholder="Enter Your City Nmae" autoComplete="off" onChange={eventChange} />
                        <input type="submit" value="search" id="submitBtn" onClick={getInfo} />
                    </form>
                </div>

                <div className="tempInformation">
                    <div className="top_layer">
                        <p id="day">{day}</p>
                        <p id="today_date">{date}</p>
                    </div>
                    <div className="main_layer">
                        <p id="city_name">{output}</p>
                        <div className={"middle_layer " + hideClass}>
                            <p id="temp"><span id="temp_real_val">{temperature}</span><sup>o</sup>C</p>
                            <p id="temp_status"><i className={'fas fa-' + weather} style={{color: color}}></i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
