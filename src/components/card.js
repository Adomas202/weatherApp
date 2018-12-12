import React from 'react';
import './styles.scss';
import moment from 'moment';

const Card = (props) => {
    const link = `http://openweathermap.org/img/w/${props.weather.list[0].weather[0].icon}.png`;
    return (
        <div>
            <div className="card">
                <span className="city">{props.location}</span>
                <br/>
                <div className="weather">
                    <img src={link} alt=""/>
                </div>
                <span className="temp">{Math.round(props.weather.list[0].temp.day)}°</span>
                <span>
                    <ul className="variations">
                      <li>{props.weather.list[0].weather[0].main}</li>
                      <li><span className="speed">{Math.round(props.weather.list[0].speed)} <span className="kmh">kmh</span></span></li>
                    </ul>
                </span>
                <div className="temp-list">
                    {props.weather.list.map((day, index) => {
                        if (index !== 0)
                            return (
                                <div key={index} className="day">
                                    {moment.weekdays(index + moment(new Date()).day()).substring(0, 3)}
                                    <br/>
                                    <span className="highTemp">{Math.round(day.temp.max)}</span>
                                    <br/>
                                    <span className="lowTemp">{Math.round(day.temp.min)}</span>
                                </div>
                            )
                    })}
                </div>
            </div>
        </div>
    )
};

export default Card;