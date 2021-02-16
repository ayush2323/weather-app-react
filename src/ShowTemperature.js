import React from 'react'
import Loader from './Loader'

const ShowTemperature = ({day, date, output, hideClass, temperature, weather, color, loading}) => {
    const showResult = () => {
        if(loading) {
            return <Loader/>
        } else {
            return (
                <div className="main_layer">
                    <p id="city_name">{output}</p>
                    <div className={"middle_layer " + hideClass}>
                        <p id="temp"><span id="temp_real_val">{temperature}</span><sup>o</sup>C</p>
                        <p id="temp_status"><i className={'fas fa-' + weather} style={{color: color}}></i></p>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="tempInformation">
            <div className="top_layer">
                <p id="day">{day}</p>
                <p id="today_date">{date}</p>
            </div>
            {showResult()}
        </div>
    )
}

export default ShowTemperature
