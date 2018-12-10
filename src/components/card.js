import React from 'react';
import './styles.scss';

const Card = (props) => {
    // noinspection JSAnnotator
    return (
        <div>
            <div className="card">
                <span className="city">{props.location}</span>
                <ul className="menu">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <br/>
                <div className="sun"></div>
                <span className="temp">{Math.round(props.weather.list[0].temp.day)}&#176;</span>
                <span>
    <ul className="variations">
      <li>{props.weather.list[0].weather[0].main}</li>
      <li><span className="speed">9<span className="mph">mph</span></span></li>
    </ul>
  </span>
                <div className="temp-list">
                    {props.weather.list.map((day, index) => {
                        if (index !== 0)
                            return (
                                <div className="day tue">TUE
                                    <br/> <span className="cloudy"></span> <br/> <span
                                        className="highTemp">{Math.round(day.temp.max)}&#176;</span>
                                    <br/> <span
                                        className="lowTemp">{Math.round(day.temp.min)}&#176;</span>
                                </div>
                            )
                    })}
                </div>
                {console.log(props.weather.list)}
            </div>
        </div>
    )
};

export default Card;