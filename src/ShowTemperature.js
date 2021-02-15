import React from 'react'

const ShowTemperature = ({day, date, output, hideClass, temperature, weather, color}) => {
    return (
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
    )
}

export default ShowTemperature
