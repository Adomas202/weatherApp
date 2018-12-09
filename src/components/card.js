import React from 'react';
import './styles.scss';

const Card = (props) => {
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
                <span className="temp">76&#176;</span>
                <span>
    <ul className="variations">
      <li>CLEAR</li>
      <li><span className="speed">9<span className="mph">mph</span></span></li>
    </ul>
  </span>
                {props.weather.list.map(day => {
                    return (
                        <div className="day tue">TUE
                            <br/> <span className="cloudy"></span> <br/> <span className="highTemp">{day.temp.max}&#176;</span>
                            <br/> <span
                                className="lowTemp">{day.temp.min}&#176;</span>
                        </div>
                    )
                })}
                {console.log(props.weather.list)}
            </div>
        </div>
    )
};

export default Card;